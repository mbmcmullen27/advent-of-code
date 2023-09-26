#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
  FILE *in;
  in = fopen("input", "r");

  char str1[10];
  int location[2] = {0,0};
  int dir[4][2] = {
    {0,1},
    {1,0},
    {0,-1},
    {-1,0}
  };
  char *card;
  int delta;
  
  while(fgets(str1, 10, in)) {
    sscanf(str1, "%c%d,", card, &delta);
    printf("Turn %c and proceed %d\n", *card, delta);
  } 

  fclose(in);
}