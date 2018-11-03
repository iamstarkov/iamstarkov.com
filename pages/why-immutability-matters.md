import { Meta } from '../components';

<Meta
  title="Why immutability matters"
  description="I’m reading Erlang book and there is a brilliant explanation why immutability matters."
/>

# Why immutability matters

_June 28, 2015_

I’m reading Erlang book and there is a brilliant explanation why immutability matters.

> Using immutable variables simplifies debugging. To understand why this is
> true, we must ask ourselves what an error is and how an error makes itself
> known.
>
> One rather common way that we discover that a program is incorrect is when
> we find that a variable has an unexpected value. Once we know which variable
> is incorrect, we just have to inspect the program to find the place where the
> variable was bound. Since Erlang variables are immutable, the code that
> produced the variable must be incorrect. In an imperative language, variables
> can be change many times, so every place where the variable was changed
> might be the place where the error occured. In Erlang there is only one place
> to look.
>
> At this point, you might wondering how it’s possible to program _without_
> mutable variables. How can we express something like `X = X + 1` in Erlang?
> The Erlang way is to invent new variable whose name hasn’t been used
> before (say `X1`) and to write `X1 = X + 1`.
>
> — Joe Armstrong, ["Programming Erlang"](http://www.amazon.com/dp/B00N4FF2L0/)

_In state we trust,  
Your mutable [Vladimir Starkov](https://iamstarkov.com/)_
