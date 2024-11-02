const charset =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_";

const reverseString = (str: string): string => {
	return str.split("").reverse().join("");
};

console.log(reverseString(charset));
