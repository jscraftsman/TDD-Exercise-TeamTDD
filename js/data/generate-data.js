const fs = require('fs');

const OPERATIONS = {
    ADDITION: 0,
    SUBTRACTION: 1,
    MULTIPLICATION: 2,
    DIVISION: 3
};

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateData() {
    let operationsCount = 0;
    let resultGroupCount = 0;
    let operationsObj = {};
    let resultGroups = {};

    for (let operator in OPERATIONS) {
        for (let leftOperand in DIGITS) {
            for (let rightOperand in DIGITS) {
                let operation = parseOperation(leftOperand, OPERATIONS[operator], rightOperand);
                let result = evaluate(leftOperand, OPERATIONS[operator], rightOperand);
                let _roundResult = roundResult(result);
                operationsObj[operation] = _roundResult;
                operationsCount++;

                let resultKey = _roundResult;
                if(!isFinite(_roundResult)) {
                    resultKey = 'Infinity';
                } else if(isNaN(_roundResult)) {
                    resultKey = 'NaN';
                } else {
                    resultKey = _roundResult;
                }

                if(!resultGroups[resultKey]) {
                    resultGroups[resultKey] = [];
                    resultGroupCount++;
                }
                resultGroups[resultKey].push(operation);
            }
        }
    }
    
    writeFile('equations.json', JSON.stringify(operationsObj));
    writeFile('result-group.json', JSON.stringify(resultGroups));

    console.log('Total number of operations: ', operationsCount);
    console.log('Total number of groups: ', resultGroupCount);
}

function parseOperation(lo, o, ro) {
    let operation = '';
    switch (o) {
        case OPERATIONS.ADDITION:       operation = '+'; break;
        case OPERATIONS.SUBTRACTION:    operation = '-'; break;
        case OPERATIONS.MULTIPLICATION: operation = 'x'; break;
        case OPERATIONS.DIVISION:       operation = '/'; break;
        default:                        operation = '?'; break;
    }
    return `${lo} ${operation} ${ro}`;
}

function evaluate(lo, o, ro) {
    let result = 0;
    switch (o) {
        case OPERATIONS.ADDITION:       result = parseInt(lo) + parseInt(ro);   break;
        case OPERATIONS.SUBTRACTION:    result = parseInt(lo) - parseInt(ro);   break;
        case OPERATIONS.MULTIPLICATION: result = parseInt(lo) * parseInt(ro);   break;
        case OPERATIONS.DIVISION:       result = parseInt(lo) / parseInt(ro);   break;
        default:                        result = null;      break;
    }
    return result;
}

function roundResult(i) {
    return i % 1 === 0 ? i : i.toFixed(1);
}

function writeFile(filename, data) {
    fs.writeFileSync(__dirname + '/' + filename, data);
}

generateData();