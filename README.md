# [Advent of Code 2016](https://adventofcode.com/2016) in Typescript

This AoC was done in 2021, to complete missing years and as a kind of warmup to the real 2021. I choose to do it in Typescript because... i don't know, i must be a masochist. I haven't touched in Javascript in a long time, not since it was considered a toy language, used only in simple scripts, and i was kind of curious about how it managed to take over server and even desktop programming, so i decided to give it a chance. 

All code is on `./src`, my input files as well as test inputs are in `./data`, compiled js is generated to `./out`.

## Post-event impressions
I felt that this event was a lot easier than later ones (which i did earlier), apart from day 11 and day 19 (which wasn't complex, just laborious) the problems were relatively straightforward and the solutions obvious, unlike in later events. This event was heavily based on breadth-first searches, which, as long as the base algorithm is correct and modular, are relatively simple to solve. A special mention for day 17 for its ingenuity.

As for Typescript/Javascript, my opinion hasn't changed. This is a broken toy language that should never have made the jump from simple scripts in web pages, and should never have been used in more complex scenarios. Typescript doesn't redeem it. How some other language hasn't taken over the duties of Javascript is a mystery and a shame (for instance Dart, which is much more pleasant and solid or ideally Kotlin, which is superb). Guess it shows the power of habits and network effects that we are stuck with such a broken tool, being used in more and more complex scenarios just because it is widely and well-known.

## Usage
To run:
> tsc && node out/aoc.js [-f FILE] [-t] day

or, more friendly, use ts-node
> ts-node src/aoc.ts [-f FILE] [-t] day


This will run the 2 parts of the specified `day` using `FILE` as input. If no file is specified `./res/input{day}` is used as input. If no file is specified and `-t` is used, `./res/input{day}Test` is used instead. 

---

## [Day 1](https://adventofcode.com/2016/day/1)
This was a warm up with significantly more work than usual... The idiosyncrasies of Javascript didn't help either.
I've already defined a class position, with some methods, which i suspect will be used in future problems. Part 2 is inefficient but it gets the job done.

## [Day 2](https://adventofcode.com/2016/day/2)
Still warming up. Different solutions for each part. The second part is generic, modelling the keypad in strings, with " " as guards.

## [Day 3](https://adventofcode.com/2016/day/3)
Surprisingly i had some trouble reading the input for this day, as it didn't follow the usual scheme of separating the different elements with a marker, using a fixed length field instead. First part is straightforward and the second part is just a matter of reading the values in the correct order - each 3 rows at a time instead of each 3 columns.

## [Day 4](https://adventofcode.com/2016/day/4)
There are a lot of manipulations on strings to check if a room is valid, which are described in the comments of the relevant function. Part 2 has some manipulations to rotate each character the specified number of times, but it's simple enough.
The inefficiency of this all hurts - the amount of temporary strings created, the number of times each string is iterated... - but at least is readable, guess it's the price to pay for writing in a semi-functional style in a language that isn't optimized for that.

## [Day 5](https://adventofcode.com/2016/day/5)
This wasn't very fun, just a brute force attack on the problem. MD5 algorithm taken from [here](http://www.myersdaily.org/joseph/javascript/md5-text.html), and it runs surprisingly fast, given that it's a pure js implementation.
Guess it's a way to show that MD5 is a weak hash given today's hardware.

## [Day 6](https://adventofcode.com/2016/day/6)
The strategy is to transpose the input, get the counts of characters for each row (column in the original input), sort by max (min in part 2) and get the first character (most common in part 1, least common in part 2).

## [Day 7](https://adventofcode.com/2016/day/7)
A simple check on the elements of each input string. On part 2 we store sequences found on each string to later check if they appear inside and outside brackets.

## [Day 8](https://adventofcode.com/2016/day/8)
With a full representation of the screen follow the given instructions, manipulating the rows/columns of the screen.
Still simple enough, but it took some effort to get rid of all the index bugs.

## [Day 9](https://adventofcode.com/2016/day/9)
The first day where the solution for part 1 can't be used on part 2 with minor modifications. 
As usual i started Part 1 as a straightforward and brute-force approach of calculating the resulting string and returning its length. For part 2, this approach wouldn't be feasible, so we just calculate the resulting length by interpreting the markers on the original string, which is what should have been done in the first place. I later refactored part 1 to use the solution devised in part 2.

## [Day 10](https://adventofcode.com/2016/day/10)
Usually it's around day 10 that the difficulty steps up, and on this edition that was also true.

This one took some work and code. Maybe there was a choice of data structures that was more straightforward and didn't take  so much code and bookkeeping, or maybe it's just that JS isn't as user-friendly as, say Python.

The general strategy is to parse the input and create 2 objects: one with the bots and its initial values and one with the transfer specifications. Afterwards, distribute the values that are on the bots object according to the transfer specifications, while there are bot values to distribute. Stop if the guard values are found, or else keep accumulating the results in the output.

## [Day 11](https://adventofcode.com/2016/day/11)
I would be ashamed to say how much time i spent on this, so the less said about this day the better. Nevertheless, i have some lessons learned, that should be documented:
- Always do a simple BFS search first, before trying to turn it into an A*;
- Make sure that the BFS implementation is correct and full, namely that newly generated nodes are checked against the already visited and the ones on the frontier...;
- Explore the pruning possibilities of the problem. In this particular scenario, the insight that a state with its microchips/controllers on certain floors and another state with different microchips/controllers but on the same floors, are equivalent from a state evolution perspective allows one to prune the search space enormously. Runtime on one problem went from +20min to 0.5s...

## [Day 12](https://adventofcode.com/2016/day/12)
A simple interpreter. I feel that this is going to get used in latter days, so i've put the code in a separate file, expecting it to grow soon.

## [Day 13](https://adventofcode.com/2016/day/13)
Part 1 is a straightforward breadth-first search.
Part 2 is the BFS search function changed to return the visited states up to a maximum depth, instead of until a match is found.

## [Day 14](https://adventofcode.com/2016/day/14)
This one took some time because i misunderstood the instructions and had some off-by-one errors afterwards. 
Part 2 was just a brute-force approach, which is somewhat slow in js (takes 73s on my computer), but is feasible because the first part solution only calculates the md5 hashes for each iteration once - a straightforward reading and implementation of the instructions might lead to a solution that calculates 1000 hashes repeatedly for each index, so in this part those hashes would have to be cached for it to be feasible.

## [Day 15](https://adventofcode.com/2016/day/15)
Fortunately i recognized this as a modular arithmetic problem, giving a fairly straightforward and simple solution. Getting the indices right took some math, and the insight that the step on the loop should be the maximum step of the discs didn't come immediately, just after the first run didn't return results in a couple of seconds. Part 2 doesn't have a story, guess it is relevant to show that a direct simulation implementation of the problem wouldn't work.

## [Day 16](https://adventofcode.com/2016/day/16)
I was surprised by this one, as it seems like a throwback to the first days. Not much to say, except that it's way too easy for day 16.

## [Day 17](https://adventofcode.com/2016/day/17)
Yet another BFS. The setup of this one is ingenious and fun so it was worth it. Part 2 is a simple copy of the BFS, changed to store the goal states visited.

Actually, part 2 is very interesting because it isn't obvious that the search ends. The setup of the problem must guarantee that the search doesn't continue forever, which got me thinking what is it that makes it so. The condition for it to be guaranteed to end is that each step of the search must generate less states that the states in the previous step, so that the number of states tend to 0 as the depth tends to infinity. In the context of this problem this means that, at each step the expected value of opened doors must be less than 1, so let's try to confirm that. We know the following:
- The probability that a specific door is opened is 5/16 (31.25%) - closed is 11/16 (68.75%);
- The end corner is final so it always has 0 doors opened;
- The other corners can have 0, 1 or 2 doors opened;
- The sides can have 0, 1, 2 or 3 doors opened;
- The center can have 0, 1, 2, 3 or 4 doors opened;

The probabilities of each scenario is given bellow:
| Doors open | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| End | 100,00% | | | | |
| Corners | 47,27% | 42,97% | 9,77% | | |
| Sides | 32,50% | 44,31% | 20,14% | 3,05% | |
| Center | 22,34% | 40,62% | 27,69% | 8,39% | 0,95% |

From this we can calculate the expected number of open doors in each case, and the expected number of open doors overall:

| | E(open) | No Tiles |
|---|---:|---:|
| End | 0 | 1 |
| Corners | 0,625 | 3 |
| Sides | 0.9375 | 8 |
| Center | 1.25 | 4 |

So, the expected value of doors opened for the whole maze is 0.8985 doors, which is < 1, guaranteeing the search to end eventually. The initial probabilities were chosen to give this result, if the probability of a door being opened would be 6/16 (37.5%), then the expected value of doors opened would be 1.078, which would result in an infinite search. 
Nice that beneath the appearance of a simple problem there's a rigorous probability reasoning.

## [Day 18](https://adventofcode.com/2016/day/18)
This was a simple cellular automata, whose implementation survived part 2 without any modification, so i'm wondering if i missed something.

## [Day 19](https://adventofcode.com/2016/day/19)
Part 1 was quick and relatively straightforward, part 2 turned into a never ending debug session.
Right out of the gates i recognized that this one shouldn't be solved by directly implementing the description, which would probably lead to long run-times, so we should identify a pattern and model it to get to the answer. For part 1 the pattern is obvious: we can consider each loop through the whole "circle" and notice that it is halved on each of these loops and that the first element of the next loop depends on wether the size of the "circle" is even or odd. The solution should be something along the lines of: starting with the number of elements, halve it until it reaches 1, advancing the first element on each loop depending on whether the length of the circle is odd or even. This seems oddly similar to a number's binary representation. Indeed, we can "read" the solution directly from the initial circle size in binary, considering that halving is dropping the least significant bit and that wether the elements at each loop are odd or even is the bit at that position. The final solution is a couple of bitwise manipulations to do that. Nice. This was a fun one, where the solution doesn't represent the structure of the problem, but instead represents the structure for a possible solution for the problem. I admit that looking at the solution isn't at all obvious how it works, but that's part of the charm.
Part 2 was another matter. The pattern isn't obvious, but it looked like it had something to do with multiples of 3, given that a pattern emerges where 2 consecutive elements are removed, and the third is kept. Going from there, and with a lot of examples done by hand, i arrived at the final solution, which depends heavily on getting the indices right but it works. Wasn't easy, at one point, i quickly implemented a direct solution to the problem, just to get the right answers to check against the "fast" approach. The "naive" approach gets the answer for part 2 in about 30mins, so the "fast" one shouldn't even be needed, but a challenge is a challenge that must be conquered. 
In retrospect, looking at the solutions for the first 100 sizes, there's definitely a pattern there that could be deciphered and implemented, and the code should be much simpler. Didn't do it though as i already had 2 working ones.

## [Day 20](https://adventofcode.com/2016/day/20)
Straightforward and quick, not much to say.

## [Day 21](https://adventofcode.com/2016/day/21)
Not much to say either, it's a direct implementation of the rules. Took some work, but it's not complicated. Of note, the rule "rotate based on position of letter" only is reversible for some password lengths, so the input must be carefully chosen.

## [Day 22](https://adventofcode.com/2016/day/22)
Yet another breadth-first search. In the solution there's no need to fully represent the grid, as having the locations of the empty, goal and unavailable are enough to characterize the state of the problem, and that is much more efficient that saving the full grid.

## [Day 23](https://adventofcode.com/2016/day/23)
Part 1 is straightforward. Part 2 needs interpreting the input code, which is not easy given that it is somewhat obfuscated. The solution contains the input translated to readable code - a factorial summed with a factor.

## [Day 24](https://adventofcode.com/2016/day/24)
Getting to the end, one more BFS problem. I'm so used to them by now that i managed to make it work correctly on the first run - no (known) bugs. This takes a long time on part 2 though (about 200s), so i might have missed some optimizations.

## [Day 25](https://adventofcode.com/2016/day/25)
And we get to the end, with one more lesson in simplified assembly decoding. I approached this one by looking at the input code, seeing that it was outputting the binary representation of (a + 365*7), so the solution is to find the first such number whose binary representation is alternating.
