#include<stdio.h>
#include<stdlib.h>
#include <limits.h>
#include <string.h>
#include "../../file-info.c"

typedef struct {
    int weight;
    int** adjacent;
    int pos[2];
} Vertex;

typedef struct {
    Vertex* nodes;
    int head;
    int tail;
    int length;
} Queue;

const int directions[4][2] = {
    { -1,  0 },
    {  0,  1 },
    {  1,  0 },
    {  0, -1 }
};

void adjacentNodes(Vertex* node) {
    node->adjacent = (int * *)malloc(sizeof(int*)*4);

    for(int i = 0; i < 4; i++) {
        node->adjacent[i] = (int *)malloc(sizeof(int)*2);
        node->adjacent[i][0] = node->pos[0] + directions[i][0];
        node->adjacent[i][1] = node->pos[1] + directions[i][1];
    }
}

void pushQueue(Queue *queue, Vertex* node) {
    if(queue->tail == queue->length) {
        memcpy(&queue->nodes[queue->head], &queue->nodes[0], queue->tail-queue->head);
        queue->head=0;
        queue->tail-=(queue->tail-queue->head);
    }
    queue->nodes[queue->tail]=*node;
    queue->tail++;
}

Vertex* popQueue(Queue *queue) {
    Vertex *ret = &queue->nodes[queue->head];
    queue->head++;
    return ret;
}

Vertex** buildGraph(FILE *input, Data *stats) {
    Vertex** graph = (Vertex * *)malloc(sizeof(Vertex*)*stats->lines);
    graph[0] = (Vertex *)malloc(sizeof(Vertex)*stats->longest);
    int ch = 0;
    int i = 0;
    int j = 0;

    while ((ch = fgetc(input)) != EOF) {
        if (ch == '\n') {
            i++;
            j = 0;
            graph[i] = (Vertex *)malloc(sizeof(Vertex)*stats->longest);
        } else {
            graph[i][j].weight = ch - '0';
            graph[i][j].pos[0] = i;
            graph[i][j].pos[1] = j;
            adjacentNodes(&graph[i][j]);
            j++;
        }
    }

    return graph;
}

int search(Vertex** graph, Data *stats) {
    Queue *queue = (Queue *)malloc(sizeof(Queue));
    queue->nodes = (Vertex *)malloc(sizeof(Vertex)*stats->lines*stats->longest);
    // Vertex queue[stats->lines * stats->longest];
    queue->head=0;
    queue->tail=1;
    pushQueue(queue, &graph[0][0]);

    int distance[stats->lines][stats->longest];
    for(int i=0; i<stats->lines; i++)
        for(int j=0; j<stats->longest;j++) 
            distance[i][j] = INT_MAX;

    distance[0][0]=0;
    Vertex current;
    while(queue->head != queue->tail) {
        current = *popQueue(queue);
        printf("processing node[%d][%d]...\n", current.pos[0], current.pos[1]);
        for(int i=0; i<4; i++) {
            //segfault here
            printf("adjacent node at: %d, %d\n", current.adjacent[i][0], current.adjacent[i][1]);
            int *pos = current.adjacent[i];
            printf("adjacent node at: %d, %d\n", pos[0], pos[1]);
            if(pos[0]>=0 && pos[0]<stats->lines && pos[1]>=0 && pos[1]<stats->longest){
                printf("processing adjacent node %d...\n", i);
                Vertex adj = graph[pos[0]][pos[1]];
                int delta = distance[current.pos[0]][current.pos[1]] + current.weight;
                if (delta < distance[pos[0]][pos[1]]) {
                    distance[pos[0]][pos[1]] = delta;
                    pushQueue(queue, &adj);
                }
            }
        }
    }

    return distance[stats->lines-1][stats->longest-1];
}

int main() {
    FILE *input;
    input = fopen("input", "r");
    Data *stats = countlines(input);

    Vertex **graph = buildGraph(input, stats);
    
    printf("weight: %d pos: %d,%d adj[0]: %d,%d\n", 
        graph[0][1].weight, 
        graph[0][1].pos[0], 
        graph[0][1].pos[1],
        graph[0][1].adjacent[0][0],
        graph[0][1].adjacent[0][1]
    );

    int result = search(graph, stats);
    printf("result: %d\n", result);
}

