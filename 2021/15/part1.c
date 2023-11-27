#include<stdio.h>
#include<stdlib.h>
#include <limits.h>
#include <string.h>
#include "../../file-info.c"

typedef struct {
    int weight;
    int pos[2];
} Vertex;

typedef struct {
    Vertex *data;
    Vertex *next;
} QueueElement;

typedef struct {
    QueueElement head;
    QueueElement tail;
} Queue;

const int directions[4][2] = {
    { -1,  0 },
    {  0,  1 },
    {  1,  0 },
    {  0, -1 }
};

void pushQueue(Queue *queue, Vertex* node) {
    QueueElement next;
    next.data = node;
    next.next = NULL;
    queue->tail->next = next;
    queue->tail = next;
}

Vertex* popQueue(Queue *queue) {
    Vertex *ret = &queue->head->data;
    queue->head=queue->head->next;
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
            j++;
        }
    }

    return graph;
}

int search(Vertex** graph, Data *stats) {
    Queue queue;
    QueueElement head;
    head->data = &graph[0][0];
    head->next = NULL;
    queue.head = head;

    int distance[stats->lines][stats->longest];
    for(int i=0; i<stats->lines; i++)
        for(int j=0; j<stats->longest;j++) 
            distance[i][j] = INT_MAX;

    distance[0][0]=0;
    Vertex current;
    while(queue.head != queue.tail) {
        current = *popQueue(&queue);
        printf("processing node[%d][%d]...\n", current.pos[0], current.pos[1]);
        for(int i=0; i<4; i++) {
            int pos[2];
            pos[0] = current.pos[0] + directions[i][0];
            pos[1] = current.pos[1] + directions[i][1];
            // printf("adjacent node at: %d, %d\n", pos[0], pos[1]);
            if(pos[0]>=0 && pos[0]<stats->lines && pos[1]>=0 && pos[1]<stats->longest){
                // printf("processing adjacent node %d,%d...\n", pos[0], pos[1]);
                Vertex adj = graph[pos[0]][pos[1]];
                int delta = distance[current.pos[0]][current.pos[1]] + adj.weight;
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
    int result = search(graph, stats);

    printf("result: %d\n", result);
    printf("max int: %d\n", INT_MAX);
}

