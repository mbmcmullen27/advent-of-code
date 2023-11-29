#include "./header.h"

double* floatMap(double arr[], int len, double (*func)(double)) {
  double *ret = malloc(sizeof(double*)*len);

  for(int i = 0; i < len; i++) {
    ret[i] = (*func)(arr[i]);
  }

  return ret;
}

double square(double x) { return (x*x); }

void test() {
  double array[] = { 1.0, 2.1, 3.5, 7.8, 14.2 };
  int len = sizeof(array) / sizeof(double);
  double *newArr = floatMap(array, len, square);
  for(int i=0; i<len; i++) 
    printf("value[%d]: %.2f\n", i, newArr[i]);

  free(newArr);
}

void main(){
  test();
}