#include<stdio.h>
#include<stdlib.h>
#include "../../file-info.c"

int main() {
  FILE *input;
  input = fopen("input", "r");
  Data *stats = countlines(input);
  int code[stats->lines];

  int ch = 0;
  int prev[2] = {2,0};
  int keypad[5][5] = {
    {0x0,0x0,0x1,0x0,0x0},
    {0x0,0x2,0x3,0x4,0x0},
    {0x5,0x6,0x7,0x8,0x9},
    {0x0,0xA,0xB,0xC,0x0},
    {0x0,0x0,0xD,0x0,0x0},
  };


  int i = 0;
  while ((ch = fgetc(input))) {
    switch(ch) {
        case 'U':
            if (prev[0] > 0 && keypad[prev[0]-1][prev[1]] != 0x0) prev[0]--;
            break;
        case 'D':
            if (prev[0] < 4 && keypad[prev[0]+1][prev[1]] != 0x0) prev[0]++;
            break;
        case 'R':
            if (prev[1] < 4 && keypad[prev[0]][prev[1]+1] != 0x0) prev[1]++;
            break;
        case 'L':
            if (prev[1] > 0 && keypad[prev[0]][prev[1]-1] != 0x0) prev[1]--;
            break;
        case '\n':
            code[i] = keypad[prev[0]][prev[1]];  
            i++;
            break;
        case EOF:
            code[i] = keypad[prev[0]][prev[1]];  
            goto Exit;
            break;
    }
  }

  Exit:
  for(i=0; i<stats->lines; i++) printf("%X", code[i]);
  puts("");

}