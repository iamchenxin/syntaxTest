/**
 * Created by iamchenxin on 1/20/16.
 */
class Petcc{
    constructor({id,name,action}){
        console.log("...");
        this.id=id;
        this.name=name;
        this.action=action;
    }
}

class Cat extends Petcc{
    constructor({food,...rest}){
        console.log(rest);
        super(rest);
        this.food=food;
    }
}

class Dog extends Petcc{
    constructor(args){
        super(args);
    }
}

class Pig extends Petcc{
    constructor(args){
        super(args);
    }
}

class Data{
    constructor(){
        this.cats=[
            new Cat({
                id:0,
                name:"tom cat",
                action:"moew",
                food:"fish"
            }),
            new Cat({
                id:1,
                name:"小短猫",
                action:"苗苗",
                food:"fish"
            }),
            new Cat({
                id:2,
                name:"neko",
                action:"nay",
                food:"dog"
            })];
        this.dogs=[new Dog({
            id:1000,
            name:"小黄",
            action:"汪汪",
        }),new Dog({
            id:1001,
            name:"wolf",
            action:"wangwang",
        }),new Dog({
            id:1002,
            name:"犬只",
            action:"噗噗",
        })];
        this.pigs=[new Pig({
            id:600,
            name:"pig1",
            action:"6666",
        }),new Pig({
            id:601,
            name:"zhu2",
            action:"zzzz",
        })];
    }

    getPet(id){
        if(id>=1000){
            id=id-1000;
            return this.dogs[id];
        }else {
            return this.cats[id];
        }
    }

    getAll(){
        return [...this.cats,...this.dogs,...this.pigs];
    }
}

var database = new Data();

export {
    database,
    Petcc,Pig,Dog,Cat
}