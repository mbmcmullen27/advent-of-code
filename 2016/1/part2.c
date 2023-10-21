#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
  FILE *input;
  input = fopen("input", "r");

  char str1[8];
  int heading = 0;
  int location[2] = {0,0};
  int dir[4][2] = {
    {0,1},
    {1,0},
    {0,-1},
    {-1,0}
  };
  char card;
  int delta, deltax;
  int (*increment)[2];
  int history[151][2];
  int historyLen = 0;
  
  while(fgets(str1, 8, input)) {
    sscanf(str1, "%c%d,", &card, &delta);
    puts("------------------------------------");
    printf("Turn %c and proceed %d\n", card, delta);
    printf("    location: %d,%d\n",location[0],location[1]);
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


    deltax = (dir[heading][0] * delta);
    increment = dir[heading];
    for(int i = 0; i < delta; i++) {
        if (abs(deltax) > 0) 
            location[0] += (*increment)[0];
        else
            location[1] += (*increment)[1];

        for (int j = 0; j < historyLen; j++) {
            if (history[j][0] == location[0] && history[j][1] == location[1]) {
                printf("\nREVISIT! %d,%d\n", location[0], location[1]);
                fclose(input);
                exit(0);
            }
        }

        historyLen++;
        history[historyLen][0] = location[0];
        history[historyLen][1] = location[1];
    }
  } 


  printf("FINAL LOCATION: %d,%d\n",location[0],location[1]);
  fclose(input);
}