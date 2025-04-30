"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = __importDefault(require("find"));
const jasmine_1 = __importDefault(require("jasmine"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const process_1 = require("process");
/******************************************************************************
                                Run
******************************************************************************/
// Start
(async () => {
    try {
        // Init Jasmine
        const jasmine = new jasmine_1.default();
        jasmine.exitOnCompletion = false;
        // Set location of test files
        jasmine.loadConfig({
            random: true,
            spec_dir: 'spec',
            spec_files: [
                './tests/**/*.spec.ts',
            ],
            stopSpecOnExpectationFailure: false,
        });
        // Run all or a single unit-test
        let doneInfo;
        if (!!process_1.argv[2]) {
            const files = await findFile(process_1.argv[2]);
            if (files.length === 1) {
                doneInfo = await jasmine.execute([files[0]]);
            }
            else {
                return jet_logger_1.default.err('Test file not found!');
            }
        }
        else {
            doneInfo = await jasmine.execute();
        }
        // Wait for tests to finish
        if (doneInfo?.overallStatus === 'passed') {
            jet_logger_1.default.info('All tests have passed :)');
        }
        else if (doneInfo?.overallStatus === 'incomplete') {
            jet_logger_1.default.warn('Some tests did not complete or were skipped');
        }
        else {
            jet_logger_1.default.err('At least one test has failed :(');
        }
    }
    catch (err) {
        return jet_logger_1.default.err(err);
    }
})();
/******************************************************************************
                                Functions
******************************************************************************/
/**
 * Wrap find file in a promise.
 */
function findFile(testFile) {
    return new Promise((res, rej) => {
        return find_1.default.file(testFile + '.spec.ts', './spec', (files) => {
            if (files.length > 0) {
                return res(files);
            }
            else {
                const err = new Error('Test file not found!');
                return rej(err);
            }
        });
    });
}
