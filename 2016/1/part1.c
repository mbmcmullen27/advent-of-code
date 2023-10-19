#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
  FILE *in;
  in = fopen("input", "r");

  char str1[10];
  int heading = 0;
  int location[2] = {0,0};
  int dir[4][2] = {
    {0,1},
    {1,0},
    {0,-1},
    {-1,0}
  };
  char card;
  int delta;
  
  while(fgets(str1, 10, in)) {
    sscanf(str1, "%c%d,", &card, &delta);
    puts("------------------------------------");
    printf("Turn %c and proceed %d\n", card, delta);
    printf("    location: %d,%d\n",location[0],location[1]);
    // puts(`   NEXT MOVE ${e}`)
    switch (card) {
      case 'R':
        puts("    TURNS RIGHT");
        heading++;
        heading = heading < 4 ? heading : 0;
        break;
      case 'L':
        puts("    TURNS LEFT");
        heading--;
        heading = heading >= 0 ? heading : 3;
        break;
    }
    printf("    delta: %d\n", delta);
  } 

  fclose(in);
}