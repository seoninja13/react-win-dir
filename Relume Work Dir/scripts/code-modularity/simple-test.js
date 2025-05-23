// Simple test file with known issues for enhanced analyzer

import React from 'react';
import { useState } from 'react';
import lodash from 'lodash'; // This will be unused
import moment from 'moment'; // This will be unused

function testFunction() {
  const [count, setCount] = useState(0);
  
  if (count > 5) {
    return count;
  }
  
  // This code is unreachable
  console.log('This will never execute');
  const unreachableVar = 10;
  
  return count;
}

// Duplicate function (similar to testFunction)
function anotherFunction() {
  const [value, setValue] = useState(0);
  
  if (value > 5) {
    return value;
  }
  
  console.log('This is similar code');
  const similarVar = 10;
  
  return value;
}

export default testFunction;
