const getBoundedIndex = (arr, index) => {
    const newPositionIdx = index % arr.length;
    return newPositionIdx < 0 ? arr.length + newPositionIdx : newPositionIdx;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function createCircularArray(arr) {
    return new Proxy(arr, {
        get(target, propertyKey, receiver) {
            if (!isNaN(propertyKey)) {
                propertyKey = getBoundedIndex(target, parseInt(propertyKey, 10));
            }
            if (propertyKey === 'getBoundedIndex') {
                return index => getBoundedIndex(target, index);
            }

            return Reflect.get(target, propertyKey, receiver);
        },
        set(target, propertyKey, value) {
            if (!isNaN(propertyKey)) {
                propertyKey = getBoundedIndex(target, parseInt(propertyKey, 10));
            }

            return Reflect.set(target, propertyKey, value);
        },
        apply(target, thisArgument, argumentsList) {
            return Reflect.apply(target, thisArgument, argumentsList);
        },
    });
}
