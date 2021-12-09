open System

let data = IO.File.ReadLines("input")
        |> Seq.toArray

let lowpoints = [||]

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

let checkAppend points i j = if check i j then (i,j)::points else points

data |> Array.mapi(fun i s -> String.iteri(fun j e ->checkAppend lowpoints i j) s)
// Array.mapi(fun i _ -> printfn "%s" data[i]) data

// for i in 0..data.Length-1 do printfn "%c" (data[i][0])
