import fs from 'node:fs';
import path from 'node:path';

const sarif = {
  version: '2.1.0',
  $schema:
    'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
  runs: [
    {
      tool: {
        driver: {
          name: 'CodeTitan',
          version: 'demo',
          informationUri: 'https://codetitan.dev',
          rules: [
            {
              id: 'HARDCODED_SECRET',
              shortDescription: {
                text: 'Hardcoded secret detected',
              },
            },
          ],
        },
      },
      results: [
        {
          ruleId: 'HARDCODED_SECRET',
          level: 'error',
          message: {
            text: 'Hardcoded secret detected. Move the credential to an environment variable.',
          },
          locations: [
            {
              physicalLocation: {
                artifactLocation: {
                  uri: 'demo.js',
                  uriBaseId: '%SRCROOT%',
                },
                region: {
                  startLine: 1,
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

const outputPath = path.resolve(process.cwd(), 'codetitan-report.sarif');
fs.writeFileSync(outputPath, JSON.stringify(sarif, null, 2), 'utf8');
console.log(`Wrote ${outputPath}`);
