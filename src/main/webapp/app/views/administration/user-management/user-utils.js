import namor from "namor";
const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

// id?: any;
//   fullName?: string;
//   phone?: any;
//   email?: string;
//   profiles?: string;
//   feature?: string;
// }

const newPerson = () => {
    const statusChance = Math.random();
    return {
        id: namor.generate({ words: 1, numbers: 0 }),
        fullName: namor.generate({ words: 1, numbers: 0 }),
        phone: Math.floor(Math.random() * 30),
        email: Math.floor(Math.random() * 100),
        profiles: Math.floor(Math.random() * 100),
        feature : Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

export function makeData(len = 5) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}