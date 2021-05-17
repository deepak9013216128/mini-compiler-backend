<!-- ABOUT THE PROJECT -->

## About The Project

A compiler is a program that converts instructions into a machine-code or lower-level form so that they can be read and executed by a computer.

This(actually every) Compiler is build into two sections known as frontend and backend.

Frontend contains:

- Lexical analyzer
- Syntax analyzer
- Semantic analysis
- Intermediate code generator

Backend contains:

- Code optimizer
- Code generator

<!-- GETTING STARTED -->

## Getting Started

We will first compile the Lexial analyzer, Syntax analyzer and Code generator using gcc

### Running and Compiling

1. Compile the Lexical, Syntax analyzer and Code generator

```sh
gcc Code/Lexical.c -o lex
gcc Code/Syntax.c -o syntax
gcc Code/CodeGen.c -o codegen
```

2. Use the given testcases(testcase1.txt, testcase2.txt) as an input in lex analyzer and redirect output to lexOutput.txt

```sh
./lex testcase1.txt > lexOut.txt
```

3. Lexial analyzer outputs stream of tokens which consists of identifier, keywords,separator,operator, and literals which goes as an input in Syntax analyzer

```sh
./syntax lexOut.txt > synOut.txt
```

4. Syntax analyzer outputs a parse tree build from the grammar defined by EBNF(disscussed above) which goes as an input in Code generator

```sh
./codegen synOut.txt > codeGen.txt
```

<!-- USAGE EXAMPLES -->

## Example Testcases

- Sample Testcase 1

```C
count = 5;
c = 'a';
 while (count < 100) {
     print("count is: ", count, "\n");
     count = count + 5;
 }
```

- Sample Testcase 2

```C

number = 5;

if(number<10){

	print(number, "\n");
}
```
# mini-compiler-backend
