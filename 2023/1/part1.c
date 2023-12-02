#include "../../lib/header.h"
#include "../../lib/file-info.c"

int main() {
  FILE *input;
  input = fopen("input", "r");
  Data *stats = countlines(input);
  char **data = (char **)malloc(sizeof(char*)*stats->lines);
  char *line = NULL;

  size_t len = 0;
  ssize_t read;

  for(int i = 0; i < stats->lines; i++) {
    read = getline(&data[i], &len, input);
    printf("%s", data[i]);
  }

  free(data);
  fclose(input);

}