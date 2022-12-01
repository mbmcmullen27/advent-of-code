open System

let data = IO.File.ReadLines("input")
        |> Seq.toArray

let isHigher e i j = 
    (e >= int(data.[i].[j]))

let mutable visited = Array.init 99 (fun _-> Array.create 99 false)

let check i j = 
    let e = int(data.[i].[j])
    match (i,j) with 
    | (x,_) when x > 0 && isHigher e (i-1) j -> false
    | (_,y) when y > 0 && isHigher e i (j-1) -> false
    | (x,_) when x < (data.Length - 1) && isHigher e (i+1) j -> false
    | (_,y) when y < (data.[i].Length - 1) && isHigher e i (j+1) -> false
    | _ -> true

let checkEdge i j =
    match (i,j) with
    | (i,j) when i < 0 || j < 0 || i >= 99 || j >= 99 -> false
    | (i,j) when int data.[i].[j] = 9 -> false
    | (i,j) when visited.[i].[j] -> false
    | _ -> true

let add a b = fst a + fst b, snd a + snd b

let rec dir (pos:List<int*int>) (queue:List<int*int>) = 
    let next = add queue.Head pos.Head
    let valid = checkEdge (fst next) (snd next)
    if valid then visited.[fst next].[snd next] = true else false
    match pos with
    | head::tail when valid -> dir tail queue@[next]
    | head::tail -> dir tail queue.Tail
    | [] -> queue

let rec loop (queue:List<int*int>) total =
    let next = dir [(-1,0); (0,1); (1,0); (0,-1)] queue
    match next with
    | head::tail -> loop tail (total + 1)
    | [] -> total
    
let search x y =
    let queue = [(x,y)]
    visited.[x].[y] = true
    loop queue 0

let points i s = seq {for j in 0 .. (String.length s)-1 do if check i j then (i,j)}

//partOne
data |> Array.mapi(fun i s -> points i s) 
    |> Seq.reduce Seq.append 
    |> Seq.map(fun e -> int data.[fst e].[snd e] - int '0' + 1)
    |> Seq.sum 
    |> printfn "%i"

//partTwo
data |> Array.mapi(fun i s -> points i s) 
    |> Seq.reduce Seq.append 
    |> Seq.map(fun point -> search (fst point) (snd point))
    |> printfn "%A"