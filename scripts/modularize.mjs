#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { Command } from 'commander';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import { generate } from 'astring';

const program = new Command();

program
  .name('modularize-js')
  .description('Splits a large JS file into modules based on AST analysis')
  .requiredOption('-i, --input <inputFile>', 'Path to the input JavaScript file')
  .requiredOption('-o, --output <outputDir>', 'Directory to place the separated module files')
  .parse(process.argv);

const options = program.opts();

async function modularize() {
  const inputPath = path.resolve(options.input);
  const outputDir = path.resolve(options.output);

  console.log(`Reading input file: ${inputPath}`);
  let content;
  try {
    content = await fs.readFile(inputPath, 'utf-8');
  } catch (err) {
    console.error(`Error reading input file: ${err.message}`);
    process.exit(1);
  }

  console.log(`Ensuring output directory exists: ${outputDir}`);
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (err) {
    console.error(`Error creating output directory: ${err.message}`);
    process.exit(1);
  }

  console.log('Parsing JavaScript into AST...');
  let ast;
  try {
    // Using ecmaVersion 'latest' and allowing module syntax
    ast = acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (err) {
    console.error(`Error parsing JavaScript: ${err.message}`);
    process.exit(1);
  }

  console.log('AST parsing successful.');

  // --- AST Traversal and Module Extraction Logic (Targeted) ---
  const extractedNodes = {}; // { moduleName: node }
  const extractedNodeStarts = new Set(); // Track start positions of extracted nodes

  // Use acorn-walk to find specific variable declarations
  walk.simple(ast, {
    VariableDeclaration(node) {
      node.declarations.forEach(declaration => {
        if (declaration.id && declaration.id.type === 'Identifier') {
          const varName = declaration.id.name;
          let moduleName = null;

          // Check for specific classes assigned to variables
          if (varName === 'ae' && declaration.init?.type === 'ClassExpression') {
            moduleName = 'spinner';
          } else if (varName === 'X' && declaration.init?.type === 'ClassExpression') {
            moduleName = 'modal';
          } else if (varName === 'ee' && declaration.init?.type === 'ClassExpression') {
            moduleName = 'browser';
          }
          // Check for specific style/constant objects
          else if (['$', 'ge', 'C'].includes(varName) && declaration.init?.type === 'ObjectExpression') {
            moduleName = 'styles'; // Group all style objects together
          }

          if (moduleName) {
            if (!extractedNodes[moduleName]) {
              extractedNodes[moduleName] = [];
            }
            // Store the entire VariableDeclaration node
            extractedNodes[moduleName].push(node);
            extractedNodeStarts.add(node.start);
            console.log(`Targeted node for extraction: Variable ${varName} assigned to module ${moduleName}`);
          }
        }
      });
    }
    // Potentially add walkers for ClassDeclaration if needed, though the target file uses expressions
  });

  // --- Collect Remaining Nodes for main.js ---
  const mainNodes = [];
  ast.body.forEach(node => {
    if (!extractedNodeStarts.has(node.start)) {
      mainNodes.push(node);
    }
  });
  if (mainNodes.length > 0) {
      extractedNodes['main'] = mainNodes;
      console.log(`Collected ${mainNodes.length} remaining top-level nodes for main.js`);
  }


  // --- Writing Modules to Files using astring ---
  console.log('\nWriting identified modules to files...');
  for (const moduleName in extractedNodes) {
    const nodes = extractedNodes[moduleName];
    if (!nodes || nodes.length === 0) continue;

    // Create a new Program node for astring containing only the nodes for this module
    const moduleAST = { type: 'Program', body: nodes, sourceType: 'module' };
    let generatedCode;
    try {
      generatedCode = generate(moduleAST);
    } catch (err) {
      console.error(`Error generating code for module ${moduleName}: ${err.message}`);
      // Fallback: try slicing original content (less reliable for multiple nodes)
      generatedCode = nodes.map(n => content.substring(n.start, n.end)).join('\n\n');
    }

    const outputPath = path.join(outputDir, `${moduleName}.js`);
    try {
      // Ensure styles are appended if multiple variables map to it
      if (moduleName === 'styles' && await fs.access(outputPath).then(() => true).catch(() => false)) {
          await fs.appendFile(outputPath, '\n\n' + generatedCode.trim());
          console.log(` - Appended to ${outputPath}`);
      } else {
          await fs.writeFile(outputPath, generatedCode.trim());
          console.log(` - Wrote ${outputPath}`);
      }
    } catch (err) {
      console.error(`Error writing file ${outputPath}: ${err.message}`);
    }
  }

  console.log('\nModularization script finished.');
  // Note: Dependencies (imports/exports) are not handled by this script.
  // Manual addition will be required after renaming to .ts and running tsc.
}

modularize().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
