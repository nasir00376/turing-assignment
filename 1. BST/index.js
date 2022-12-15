class Node {
  constructor(key, value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.key = key;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * Insert a node, given as input a (key, value) pair
   * @param {key-value pair} data
   * @returns
   */

  insert(data = {}) {
    const [key, value] = Object.entries(data)[0] || [];
    if (!key) return this;

    const newNode = new Node(key, value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;
    while (true) {
      if (key < currentNode.key) {
        // Left
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }

        currentNode = currentNode.left;
      } else {
        // Right
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }

        currentNode = currentNode.right;
      }
    }
  }

  /**
   * Search for a node given as input a key, and output the value searched node (Null if not found)
   * @param {string} key
   * @returns string | number | object | null
   */

  lookup(key = "") {
    if (!this.root) return null;

    let currentNode = this.root;

    while (currentNode) {
      if (key === currentNode.key) return currentNode.value;

      currentNode =
        key < currentNode.key ? currentNode.left : currentNode.right;
    }

    return null;
  }

  remove(key = "") {
    if (!this.root) return null;

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode) {
      if (key < currentNode.key) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (key > currentNode.key) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (key === currentNode.key) {
        // We have a match, get to work!

        // Option 1: No right child:
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            // if parent > current, make current left child, a child of parent
            if (parentNode.key > currentNode.key) {
              parentNode.left = currentNode.left;

              // if parent < current, make current left child a right child of parent
            } else if (parentNode.key < currentNode.key) {
              parentNode.right = currentNode.left;
            }
          }
          // Option 2: Right child with no left child
        } else if (currentNode.right.left === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            currentNode.right.left = currentNode.left;
            // if parent > current, make right child of the left the parent
            if (parentNode.key > currentNode.key) {
              parentNode.left = currentNode.right;
              //  if parent < current, make right child, a right child of the parent
            } else if (parentNode.key < currentNode.key) {
              parentNode.right = currentNode.right;
            }
          }
          // Option 3: Right child that has a left child
        } else {
          // find left most child of right child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;

          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }

          // Parent's left subtree is now leftmost's subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.key < parentNode.key) {
              parentNode.left = leftmost;
            } else if (currentNode.key > parentNode.key) {
              parentNode.right = leftmost;
            }
          }
        }

        return true;
      }
    }
  }

  /**
   * Print all keys in sorted order
   * @returns
   */

  printKeys() {
    if (!this.root) return false;
    let keys = [];

    let currentNode = this.root;

    while (currentNode) {
      keys.push(currentNode.key);

      currentNode = currentNode.left ? currentNode.left : currentNode.right;
    }

    const sortedKeys = keys.sort((a, b) => a - b);

    console.log("Sorted Keys: ", sortedKeys);
  }

  /**
   * Given a reference to a node n in the tree, find the successor node
   * @param {string} key
   * @returns Tree node | null
   */

  findSuccessor(key = "") {
    if (!this.root) return null;

    let currentNode = this.root;

    while (currentNode) {
      if (key < currentNode.key) {
        currentNode = currentNode.left;
      } else if (key > currentNode.key) {
        currentNode = currentNode.right;
      } else if (key === currentNode.key) {
        // We have a match, get to work!
        return this.successor(currentNode);
      }
    }

    return null;
  }

  successor(root) {
    if (root == null || root.right == null) return null;
    root = root.right;

    while (root.left != null) root = root.left;
    return root;
  }
}

const tree = new BinarySearchTree();

tree.insert({ banana: 9 });
tree.insert({ mango: 6 });
tree.insert({ oranges: 20 });
tree.insert({ tomato: 170 });
tree.insert({ strawberry: 15 });
tree.insert({ pineapple: 1 });

const searchKey = "oranges";
const removeKey = "tomato";
const successorOf = "oranges";

console.log(`Searching for ${searchKey}: `, tree.lookup(searchKey));
console.log(`Remove key ${removeKey}: `, tree.remove(removeKey));
console.log(
  `Find successor node of ${successorOf}: `,
  tree.findSuccessor(successorOf)
);

tree.printKeys();

function traverse(node) {
  console.log("traverse::", node);
  const tree = { key: node.key, value: node.value };

  tree.left = node.left == null ? null : traverse(node.left);
  tree.right = node.right == null ? null : traverse(node.right);

  return tree;
}
