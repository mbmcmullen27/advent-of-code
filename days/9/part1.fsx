open System

let data = IO.File.ReadLines("input")
        |> Seq.toArray

let check i j = 
    match (i,j) with 
    | (x,y) when x>0 && y>0 -> i < int (data[i][j+1]) && i < int (data[i+1][j]) && i < int (data[i-1][j])
    // | (_,0) -> i < int (data[])
 

// Array.mapi(fun i _ -> printfn "%s" data[i]) data

// for i in 0..data.Length-1 do printfn "%c" (data[i][0])
