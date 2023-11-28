#include<stdio.h>
#include<stdlib.h>
#include <limits.h>
#include <string.h>
#include "../../file-info.c"

typedef struct {
    int weight;
    int pos[2];
} Vertex;

typedef struct QueueElement{
    Vertex *data;
    struct QueueElement *next;
} QueueElement;

int directions[4][2] = {
    { -1,  0 },
    {  0,  1 },
    {  1,  0 },
    {  0, -1 }
};

QueueElement *head = NULL, *tail = NULL;

void pushQueue(Vertex* node) {
    QueueElement *next = (QueueElement *)malloc(sizeof(QueueElement));
    next->data = node;
    next->next = NULL;
    if (head == NULL) {
        head = next;
        tail = next;
    } else {
        tail->next = next;
        tail = next;
    }
}

Vertex* popQueue() {
    QueueElement *temp=head;
    Vertex *ret = head->data;
    head = head->next;
    if (head == NULL) tail = NULL;
    free(temp);
    printf("return data %d,%d\n", ret->pos[0],ret->pos[1]);
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

void printList() {
    QueueElement *temp = head;

    while(temp) {
        printf("%d,%d->",temp->data->pos[0], temp->data->pos[0]);
        temp = temp->next;
    }
    printf("NULL\n");
}

int search(Vertex** graph, Data *stats) {
    puts("Begin search");
    printf("initial data %d,%d = %d\n",graph[0][0].pos[0],graph[0][0].pos[1], graph[0][0].weight);
    pushQueue(&graph[0][0]);
    puts("Queue initialized");
    int distance[stats->lines][stats->longest];
    for(int i=0; i<stats->lines; i++)
        for(int j=0; j<stats->longest;j++) 
            distance[i][j] = INT_MAX;

    distance[0][0]=0;
    Vertex current;
    while(head != NULL) {
        current = *popQueue();
        puts("--------------------");
        printf("Current node: %d,%d\n", current.pos[0], current.pos[1]);
        printf("distance: %d\n\n", distance[current.pos[0]][current.pos[1]]);
        for(int i=0; i<4; i++) {
            printf("checking direction <%d,%d>\n",directions[i][0],directions[i][1]);
            int x = (current.pos[0] + directions[i][0]);
            int y = (current.pos[1] + directions[i][1]);
            if(x>=0 && x<stats->lines && y>=0 && y<stats->longest){
                Vertex *adj = &graph[x][y];
                printf("reachable adjacent node at: %d,%d w: %d\n", x, y, adj->weight);
                int delta = distance[current.pos[0]][current.pos[1]] + adj->weight;
                if(delta < 0) delta = INT_MAX;
                if (delta < distance[x][y]) {
                    distance[x][y] = delta;
                    printf("pushing node %d,%d distance: %d...\n",x,y, delta);
                    // printf("node pos: %d,%d weight: %d\n", adj.pos[0],adj.pos[1], adj.weight);
                    pushQueue(adj);
                    printList();
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
}

