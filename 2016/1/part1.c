#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
  FILE *in;

  do {
    char str1[10];
    int delta;

    in = fopen("input", "r");
    int n = fscanf(in, "%1s%d,%*[ ]%99[^\n]", str1, &delta);
    printf("turn %s and move %d\n", str1, delta);
    if (n == EOF) break;
  } while(1);
}