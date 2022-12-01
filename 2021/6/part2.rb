school = Array.new(9,0)
input = IO.readlines("input")
input = input[0].split(',')

for i in 0...input.size do
    school[Integer(input[i])] += 1
end

257.times do 
    school[9] = school[0]
    for i in 0..8 do
        school[i] = school[i+1]
    end
    school[6] += school[9]

end

puts school[0,8].reduce(0) {|sum, e| sum + e}


