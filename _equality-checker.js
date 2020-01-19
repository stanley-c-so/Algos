function equals (actual, expected) {

  // IF actual OR expected IS EITHER undefined OR null THEN DIRECTLY COMPARE (AS THOSE DON'T HAVE CONSTRUCTORS)
  if (
    actual === undefined
    || expected === undefined
    || actual === null
    || expected === null
  ) return actual === expected;

  // CHECK CONSTRUCTORS. IF actual AND expected DO NOT HAVE THE SAME CONSTRUCTOR, RETURN FALSE
  if (actual.constructor !== expected.constructor) return false;

  // NOW THE TEST VARIES DEPENDING ON THE CONSTRUCTOR...
  switch (actual.constructor) {
    case Array:                                               // ARRAYS: (1) check lengths, (2) recurse on elements
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!equals(actual[i], expected[i])) return false;
      }
      return true;
    case Set:                                                 // SETS: (1) spread into array and sort, (2) recurse on sorted arrays
      return equals([...actual].sort(), [...expected].sort());
    case Boolean:                                             // BOOLEANS: direct comparison
      return actual === expected;
    case String:                                              // STRINGS: direct comparison
      return actual === expected;
    case Number:                                              // NUMBERS: (1) check whether actual and expected are both NaN, (2) direct comparison
      return (isNaN(actual) && isNaN(expected))
        ? true
        : actual === expected;
    default:                                                  // OBJECTS AND CUSTOM CLASSES (default): (1) recurse on sorted keys, (2) compare values by key
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      if (!equals(actualKeys, expectedKeys)) return false;
      for (let i = 0; i < actualKeys.length; i++) {
        if (!equals(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
      }
      return true;
  }
}

module.exports = equals;

if (require.main === module) {      // only console.log these tests if this file is run directly from the command line

  // booleans
  console.log('BOOLEANS:');
  console.log('true?', equals(true, true));
  console.log('true?', equals(false, false));
  console.log('false?', equals(true, false));
  console.log('false?', equals(false, true));
  console.log('');

  // numbers
  console.log('NUMBERS:');
  console.log('true?', equals(1, 1));
  console.log('false?', equals(0, 1));
  console.log('');

  // strings
  console.log('STRING:');
  console.log('true?', equals('abc', 'abc'));
  console.log('false?', equals('abc', 'abcd'));
  console.log('');

  // arrays
  console.log('ARRAYS:');
  console.log('true?', equals([], []));
  console.log('false?', equals([], [1]));
  console.log('true?', equals([1, 2, 3], [1, 2, 3]));
  console.log('false?', equals([1, 2, 3], [3, 2, 1]));
  console.log('');

  // object literals
  console.log('OBJECT LITERALS:');
  console.log('true?', equals({}, {}));
  console.log('false?', equals({}, {'a': 1}));
  console.log('true?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3}));
  console.log('false?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6}));
  console.log('false?', equals({'a': 1, 'b': 2, 'c': 3}, {'d': 1, 'e': 2, 'f': 3}));
  console.log('true?', equals({'a': 1, 'b': 2, 'c': 3}, {'c': 3, 'b': 2, 'a': 1}));
  console.log('false?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3, 'd': 4}));
  console.log('');

  // nested objects
  console.log('NESTED OBJECTS:');
  console.log('true?', equals([{'a': 1, 'b': 2, 'c': 3}, [], {'d': 4, 'e': {'f': 6, 'g': 7}}], [{'c': 3, 'b': 2, 'a': 1}, [], {'e': {'g': 7, 'f': 6}, 'd': 4}]));
  console.log('');

  // NaN - if actual and expected are both NaN, it should return true
  console.log('NaN:');
  console.log('true?', equals(NaN, NaN));
  console.log('false?', equals(1, NaN));
  console.log('false?', equals(NaN, 1));
  console.log('true?', equals(1 * 'asdf', 2 * 'asdf'));
  console.log('');

  // null
  console.log('NULL:');
  console.log('true?', equals(null, null));
  console.log('false?', equals(1, null));
  console.log('false?', equals(null, 1));
  console.log('false?', equals(null, undefined));
  console.log('false?', equals(null, NaN));
  console.log('false?', equals(NaN, null));
  console.log('');

  // undefined
  console.log('UNDEFINED:');
  console.log('true?', equals(undefined, undefined));
  console.log('false?', equals(1, undefined));
  console.log('false?', equals(undefined, 1));
  console.log('false?', equals(undefined, null));
  console.log('false?', equals(undefined, NaN));
  console.log('false?', equals(NaN, undefined));
  console.log('');

  // sets
  console.log('SETS:');
  console.log('true?', equals(new Set(), new Set()));
  console.log('false?', equals(new Set([1]), new Set()));
  console.log('true?', equals(new Set([1, 2, 3]), new Set([3, 2, 1])));
  console.log('false?', equals(new Set([[1], 2, 3]), new Set([[3], 2, 1])));
  console.log('true?', equals(new Set(new Set([1, 2, 3])), new Set([3, 2, 1])));
  console.log('true?', equals(new Set(new Set([1, 2, 3, 2, 1, 2, 3, 2, 1])), new Set([3, 2, 1])));
  console.log('');

}