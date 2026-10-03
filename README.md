# LibreSignal 🚦

A local JavaScript practice environment for CodeSignal's Industry Coding Framework (ICF) assessments.

The repository mirrors the progressive format of the assessment: each challenge has four levels, and each new level extends the system without changing the behavior required by earlier levels.

## Requirements

- Node.js 18 or newer
- npm

## Setup

Install the test dependencies once from the repository root:

```bash
npm install
```

## Challenges

Two complete challenges are ready to implement:

- `Questions/bank_system`
- `Questions/in_memory_database`

Each challenge contains:

```text
challenge/
├── level1.md
├── level2.md
├── level3.md
├── level4.md
├── src/
│   ├── <challenge>Interface.js
│   └── <challenge>.js
└── specs/
    ├── level1Tests.js
    ├── level2Tests.js
    ├── level3Tests.js
    ├── level4Tests.js
    └── sandboxTests.js
```

The implementation classes use CommonJS and extend a separate interface class, matching the structure used by CodeSignal JavaScript filesystem tasks. All implementation methods are intentionally left as TODOs.

The `workers` and `storage` directories are retained as statement-only reference material because the source repository did not include implementations or test suites for them.

## Working Through a Challenge

1. Choose a challenge.
2. Read `level1.md`.
3. Implement only the Level 1 methods in the challenge's `src` implementation file.
4. Run the Level 1 suite.
5. Continue one level at a time, extending your existing design without breaking earlier behavior.

Implementation files:

- `Questions/bank_system/src/bankSystem.js`
- `Questions/in_memory_database/src/inMemoryDatabase.js`

Do not edit the interface files or official specs while practicing. Use `sandboxTests.js` for experiments.

## Running Tests

Run the complete suite, including every official level for both challenges:

```bash
npm test
```

Run cumulative levels for the Bank System challenge:

```bash
npm run test:bank:level1
npm run test:bank:level2
npm run test:bank:level3
npm run test:bank:level4
```

Run cumulative levels for the In-memory Database challenge:

```bash
npm run test:database:level1
npm run test:database:level2
npm run test:database:level3
npm run test:database:level4
```

For example, `npm run test:bank:level3` runs Bank System Levels 1, 2, and 3 without running any database tests. Earlier behavior remains part of every later-level checkpoint within that exercise.

Run one complete challenge:

```bash
npm run test:bank
npm run test:database
```

Mocha prints every passing and failing test in the terminal. Failures are expected until you implement the corresponding TODO methods.

## Sandbox Tests

Each challenge has an editable `specs/sandboxTests.js`. Its starter test is skipped and clearly marked unofficial. You can unskip it or add test cases while experimenting without modifying the official level specs.

## Scoring Intent

The public tests retain the original repository's level boundaries and behavior. Like the real ICF assessment, later levels deliberately require you to extend or refactor prior work while preserving everything that already passed. Aim for a modular design, but build the implementation yourself—the repository contains no reference solution.

## Additional Statement-Only Exercises

`Questions/workers` and `Questions/storage` contain additional problem statements from the original repository. They are not included in `npm test` because the original repository did not supply executable implementations or tests for those exercises.

## License

This project follows the license terms of the original repository.
