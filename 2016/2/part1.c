#include<stdio.h>
#include<stdlib.h>
#include "../../file-info.c"

int main() {
  FILE *input;
  input = fopen("input", "r");
  Data *stats = countlines(input);
  int code[stats->lines];

  int ch = 0;
  int prev[2] = {1,1};
  int keypad[3][3] = {
    {1,2,3},
    {4,5,6},
    {7,8,9}
  };


  int i = 0;
  while ((ch = fgetc(input))) {
    switch(ch) {
        case 'U':
            if (prev[0] > 0) prev[0]--;
            break;
        case 'D':
            if (prev[0] < 2) prev[0]++;
            break;
        case 'R':
            if (prev[1] < 2) prev[1]++;
            break;
        case 'L':
            if (prev[1] > 0) prev[1]--;
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
  for(i=0; i<stats->lines; i++) printf("%d", code[i]);
  puts("");

}