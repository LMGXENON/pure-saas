import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('JSON Schemas: Syntax and Structure Verification', () => {
  const schemasDir = path.resolve(process.cwd(), 'references/schemas');
  const files = ['design-brief.schema.json', 'design-md.schema.json', 'reference-record.schema.json'];

  for (const file of files) {
    const fullPath = path.join(schemasDir, file);
    assert.ok(fs.existsSync(fullPath), `Schema file must exist: ${file}`);

    const raw = fs.readFileSync(fullPath, 'utf8');
    let parsed;
    assert.doesNotThrow(() => {
      parsed = JSON.parse(raw);
    }, `Schema ${file} must be valid JSON`);

    assert.ok(parsed.$schema, `Schema ${file} must declare $schema`);
    assert.ok(parsed.title, `Schema ${file} must have title`);
    assert.strictEqual(parsed.type, 'object', `Schema ${file} root type must be object`);
    assert.ok(Array.isArray(parsed.required), `Schema ${file} must declare required properties`);
  }
});

