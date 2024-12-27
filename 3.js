class Dir {
  constructor() {
    this.root = {};
  }
  mkdir(dir) {
    let cur = this.root;
    for (let i = 0; i < dir.length; i++) {
      if (!cur[dir[i]]) {
        cur[dir[i]] = {};
      }
      cur = cur[dir[i]];
    }
  }
  rm(dir) {
    let cur = this.root;
    for (let i = 0; i < dir.length; i++) {
      if (i === dir.length - 1) {
        delete cur[dir[i]];
      } else {
        if (cur[dir[i]]) cur = cur[dir[i]];
      }
    }
  }
  cp(dir1, dir2) {
    let target = "";
    let targetDir = {};
    let cur = this.root;
    for (let i = 0; i < dir1.length; i++) {
      if (i === dir1.length - 1) {
        target = dir1[i];
        targetDir = cur[dir1[i]];
      } else {
        if (cur[dir1[i]]) cur = cur[dir1[i]];
      }
    }

    cur = this.root;
    for (let i = 0; i < dir2.length; i++) {
      if (!cur[dir2[i]]) {
        this.mkdir(dir2.slice(i));
        break;
      } else {
        cur = cur[dir2[i]];
      }
    }
    cur[target] = { ...targetDir };
  }
  result() {
    const resultArr = ["/"];
    const recursion = (cur, str) => {
      for (let i in cur) {
        resultArr.push(str + "/" + i);
        recursion(cur[i], str + "/" + i);
      }
    };
    recursion(this.root, "");

    return resultArr.sort();
  }
}

const solution = (directory, command) => {
  const dir = new Dir();
  for (let i = 0; i < directory.length; i++) {
    const arr = directory[i].split("/").filter((v) => v.length);
    dir.mkdir(arr);
  }

  for (let i = 0; i < command.length; i++) {
    const [com, ...at] = command[i].split(" ");
    if (com === "cp") {
      const prevArr = at[0].split("/").filter((v) => v.length);
      const nextArr = at[1].split("/").filter((v) => v.length);
      dir.cp(prevArr, nextArr);
    } else {
      const atArr = at[0].split("/").filter((v) => v.length);
      if (com === "mkdir") {
        dir.mkdir(atArr);
      } else if (com === "rm") {
        dir.rm(atArr);
      }
    }
  }

  return dir.result();
};

console.log(
  solution(
    [
      "/",
      "/hello",
      "/hello/tmp",
      "/root",
      "/root/abcd",
      "/root/abcd/etc",
      "/root/abcd/hello",
    ],
    ["mkdir /root/tmp", "cp /hello /root/tmp", "rm /hello"]
  )
);

console.log(
  solution(
    ["/"],
    ["mkdir /a", "mkdir /a/b", "mkdir /a/b/c", "cp /a/b /", "rm /a/b/c"]
  )
);
