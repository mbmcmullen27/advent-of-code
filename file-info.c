#include<stdio.h>
#include<stdlib.h>

typedef struct {
    int lines;
    int longest;
} Data;

Data* countlines(FILE *file) {
    Data *ret = malloc(sizeof(Data));

    ret->lines = 1;
    ret->longest = 0;
    int current = 0;
    int ch = 0;

    while ((ch = fgetc(file)) != EOF) {
        if (ch == '\n') {
            ret->lines++;
            ret->longest = current > ret->longest ? 
                current : ret->longest;
            current = 0;
        } else {
            current++;
        }
    }
    rewind(file);
    return ret;
}

int test() {
    FILE *fp = fopen("test", "r");
    Data *stats = countlines(fp);
    fclose(fp);
    
    printf("File has %d lines and the longest line has %d characters\n", stats->lines, stats->longest);
}