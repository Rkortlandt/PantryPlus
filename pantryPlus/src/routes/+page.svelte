<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<nav class="navbar bg-base-200 z-50 max-h-6 sticky left-0 top-0 hidden md:flex shadow-2xl">
	<div class="flex-none"></div>
	<div class="flex-1">
	  <p class="m-2 font-semibold btn normal-case text-xl btn-ghost">PantryPlus</p>
	</div>
	<div class="flex-1"></div>
	<div class="flex-none">
		<a href='/login' class="btn btn-primary mx-2">Login</a>
		<a href='/chooseSignUp' class="btn btn-secondary">SignUp</a>
	</div>
</nav>
<section>
	<div class="join left-2 top-2 sticky md:hidden z-50 m-1 bg-black">
        <button class="join-item btn btn-md btn-secondary">SignUp</button>
        <button class="join-item btn btn-primary mx-1">Login</button>
      </div>
      <div class=" hero bg-base-100 w-full text-center" style="height: 40vh">
        <h1 class="text-3xl sm:text-5xl my-10 font-extrabold">
          <span class="font-black italic underline underline-offset-8">Empower</span> your shopping with PantryPlus.
        </h1>
      </div>
      <div class="bg-neutral grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10">
        <div class="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div class="card-body">
            <h2 class="card-title">Family-friendly grocery list management.</h2>
            <p>
              Always know what your shopping for! Learn what your family wants and needs in your next trip to the store.
            </p>
          </div>
        </div>
        <div class="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div class="card-body">
            <h2 class="card-title">Full control of your list</h2>
            <p>
              Set user roles for your family, control who can add items or remove them, with or without approval from{' '}
              <span class="italic font-bold">you.</span>
            </p>
          </div>
        </div>
        <div class="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div class="card-body">
            <h2 class="card-title">Avoid Conflicts with real time list syncing</h2>
            <p>
              Make sure everyone is on the same page with real time list syncing. So everyone{' '}
              <span class="font-bold italic">always</span> knows whats on the list.{' '}
            </p>
          </div>
        </div>
        <div class="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div class="card-body">
            <h2 class="card-title">Save time with list History</h2>
            <p>Automatic item suggestions based on your list history. Reload an old list at any time</p>
          </div>
        </div>
      </div>
</section>

<style>
</style>
