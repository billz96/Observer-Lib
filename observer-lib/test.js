import { Observer } from "./observer" ;

let person = {
    name: "Bill",
    age: 14,
    get toStr() {
        return `name:${this.name} age:${this.age}`;
    },
    print() {
        console.log(this.toStr);
    },
    add(a, b) {
        return a + b;
    }
}

let observer = new Observer(
    person,
    (prop, value, exists) => {
        exists ? console.log(`GET ${prop} (=${value})`) : console.log(`UNDEF ${prop}`);
    },
    (prop, oldValue, newValue, exists) => {
        exists ? console.log(`SET ${prop} FROM ${oldValue} TO ${newValue}`) : console.log(`DEF ${prop} = ${newValue}`);
    }
);

observer.set("name", "Bob");
console.log(observer.get("age"));
observer.set("profession", "Web developer");
console.log(observer.get("toStr"));
observer.call("print");
console.log(observer.call("add", 3, 4));

observer.toggle(); // off
observer.set("name", "Foo");
console.log(observer.get("age"));
observer.set("isMale", true);

observer.toggle(); // on
observer.set("name", "Baz");
console.log(observer.get("age"));
observer.set("isMale", false);
console.log(observer.get("bar"));

// new computed property
observer.set("first", "Bobby");
observer.set("last", "Z");
observer.set("fullName", function () {
    return `${this.first} ${this.last}`;
});
console.log(observer.call("fullName"));