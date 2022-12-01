$no_fish = 0
class Laternfish
    def initialize(initial)
        @days = initial
        $no_fish += 1
    end

    def advance?
        if @days == 0 then
            @days = 6
            true
        else
            @days -= 1
            false
        end
    end
end

def partOne
    school = []

    input = IO.readlines("input")
    input = input[0].split(',')

    for i in 0...input.size do
        school[i] = Laternfish.new(Integer(input[i]))
    end

    80.times do 
        for fish in school do
            if fish.advance?() then
                school << Laternfish.new(9)
            end
        end
    end

    puts $no_fish
end

def partTwo
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
end

partOne
partTwo