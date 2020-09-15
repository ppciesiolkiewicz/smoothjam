import createCircularArray from './CircularArray';

describe('CircularArray', () => {
    let arr;

    beforeEach(() => {
        arr = createCircularArray([0, 1, 2]);
    });

    describe('When getting array element', () => {
        it('Should return correct value for negative indices', () => {
            expect(arr[-1]).toEqual(2);
            expect(arr[-4]).toEqual(2);
        });

        it('Should return correct value for indices larger than array length', () => {
            expect(arr[3]).toEqual(0);
            expect(arr[6]).toEqual(0);
        });
    });

    describe('When setting array element', () => {
        it('Should return correct value for negative indices', () => {
            arr[-4] = 100;
            expect(arr[-1]).toEqual(100);
            expect(arr[2]).toEqual(100);
        });

        it('Should return correct value for indices larger than array length', () => {
            arr[3] = 200;
            expect(arr[3]).toEqual(200);
            expect(arr[0]).toEqual(200);
        });
    });

    describe('getBonudedIndex', () => {
        it('Should return correct index corresponding to index of a normal array', () => {
            expect(arr.getBoundedIndex(-1)).toEqual(2);
            expect(arr.getBoundedIndex(3)).toEqual(0);
        });
    });
});
