export function gcd(num1: number, num2: number) {
  if (num1 % num2 == 0) {
    return num2;
  } else {
    return gcd(num2, num1 % num2);
  }
}

export function lcm(num1: number, num2: number) {
  return (num1 * num2) / gcd(num1, num2);
}
