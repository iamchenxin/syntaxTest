/* @flow */
function log(v:string){
  console.log(v);
}

function foo(str:string,x:number):string{
    if(str.length>x){
        return `length > ${x}`;
    }else{
        return ` < ${x}`;
    }
}

function foo2(v:number){
  log(v.toString());
}


type AC = {
  a:?string,
  b:number,
};


interface ILikeC {
  x: string;
  y: number;
  foo(): string;
  bar(y: number): void;
}

class ExportC {
  x: string;
  y: number;
  constructor(x: string) { this.x = x; }
  foo(): string { return this.x; }
  bar(y: number): void { this.y = y; }
}

function takesAnILikeC(c: ILikeC): string { return c.foo(); }



// similarly, C satisfies this object shape
type XY = { x: string; yy: number; };

function takesAnXY(xy: XY): number { return xy.y; }

var c: ExportC = new ExportC("satisfies XY");

var n: number = takesAnXY(c);