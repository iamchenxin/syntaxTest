class Node {
  constructor(codeBlock) {
    this.codeBlock = codeBlock;
    this.nextNode = null;
  }
  link(node:Node) {
    this.nextNode = node;
  }
  exeNext(arg){
    if(this.nextNode){
      return this.nextNode.exe(arg);
    }else {
      return arg;
    }
  }
  run(arg){
    const arg = this.codeBlock(arg);
    this.exeNext(arg);
  }
}

class asyncNode extends Node{
  blockDone(result){
    this.exeNext(result);
  }
  run(arg){
    return this.codeBlock(arg,this);
  }
}

class Chain {
  constructor(codeBlock){
    this.fristNode = new asyncNode(codeBlock);
    this.currNode = this.fristNode;
    setTimeout(()=>{
      this.execute();
    },0);
  }
  push(codeBlock){
    const node = new Node(codeBlock);
    this.currNode.link(node);
    this.currNode = node;
    return this;
  }
  execute(){
    return this.fristNode.run(null);
  }
}
