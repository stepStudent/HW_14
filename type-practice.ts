type User = {
    id: number;
    name: string;
    age: number;
    isActive: boolean;
};
const user: User = {
    id: 101, name: "Олена",
    age: 20,
    isActive: true
};
console.log(user);
// помилки у TypeScript виправлені — 0 errors), 
// але з-за того , що змінна user була оголошена і ніде далі не використовувалась 
// був  1 warning
// для  цього  console.log(user); вивели у консоль