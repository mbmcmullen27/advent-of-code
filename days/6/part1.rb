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

    def days
        @days
    end
end

school = []

input = IO.readlines("input")
input = input[0].split(',')

for i in 0...input.size do
    school[i] = Laternfish.new(Integer(input[i]))
end

256.times do 
    # puts "day:"
    for fish in school do
        if fish.advance?() then
            school << Laternfish.new(9)
        end
        # print "#{fish.days},"
    end
    # puts "\n\n"
end

puts $no_fish

