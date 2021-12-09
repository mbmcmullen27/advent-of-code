open System

let data = IO.File.ReadLines("input")
        |> Seq.toArray

let isHigher e i j = 
    (e >= int(data.[i].[j]))

let check i j = 
    let e = int(data.[i].[j])
    match (i,j) with 
    | (x,_) when x > 0 && isHigher e (i-1) j -> false
    | (_,y) when y > 0 && isHigher e i (j-1) -> false
    | (x,_) when x < (data.Length - 1) && isHigher e (i+1) j -> false
    | (_,y) when y < (data.[i].Length - 1) && isHigher e i (j+1) -> false
    | _ -> true

let points i s = seq {for j in 0 .. (String.length s)-1 do if check i j then (i,j)}

data |> Array.mapi(fun i s -> points i s) 
    |> Seq.reduce Seq.append 
    |> Seq.map(fun e -> int data.[fst e].[snd e] - int '0' + 1)
    |> Seq.sum 
    |> printfn "%i"

