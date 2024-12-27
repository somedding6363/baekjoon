const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (!this.left) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  postOrder(callback) {
    if (this.left) {
      this.left.postOrder(callback);
    }
    if (this.right) {
      this.right.postOrder(callback);
    }
    callback(this.value);
  }
}

const bst = new BST(input[0]);
for (let i = 1; i < input.length; i++) {
  bst.insert(input[i]);
}

bst.postOrder((v) => console.log(v));
