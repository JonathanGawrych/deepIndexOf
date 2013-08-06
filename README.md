deepIndexOf
===========

Adds a prototype to Array that allows you to do indexOf for a object by value, rather than by reference. The normal indexOf code was taken from MDN's Array.indexOf[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf]  The object is checked by Angular's equals function, however instead of using angular.equals() I pulled the function out of angular and removed all angular references, so it will work if you use AngularJS or not.

Note that because I pulled it from AngularJS, deepIndexOf will ignored any variable prefixed with a dollar sign, or functions on the object.  deepIndexOf currently does not look for or handle recursive references.  Attempted to use deepIndexOf on an Array containing an object that has a recursive reference will cause an infinite loop with the browser throwing some sort of stack limit exception.

It should be noted that deepIndexOf is much slower than it's indexOf counterpart.  Always try to use indexOf instead.  The main reason I made this was due to angularjs adding "hidden" variables (such as $hashkey) but were throwing off indexOf.
