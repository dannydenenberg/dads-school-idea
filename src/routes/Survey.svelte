<script>
  let schools = "";
  $: schoolsList = schools.trim().split(/, ?/); // array of schools
  let schoolsListFinal = [];

  // returns a string
  async function getOneSchoolName(name) {
    let res = await fetch(`/colleges?q=${name}`);
    let schoolsResult = await res.json();
    let name2 = schoolsResult[0]?.name;
    console.log(`NAME: ${name2}`);
    return name2;
  }

  async function getSchoolRealNames() {
    let realNames = [];
    for (let index = 0; index < schoolsList?.length; index++) {
      const name = schoolsList[index];
      let realname = await getOneSchoolName(name);
      realNames.push(realname);
    }

    schoolsListFinal = realNames.filter((el) => el != undefined);

    console.log(realNames);
  }

  function handleSubmit(event) {
    const formData = new FormData(event.target);
    const formObject = {}; // a variable with all the form info
    for (const [k, v] of formData.entries()) {
      formObject[k] = v;
    }
    console.log("form contents:", formObject);
  }
</script>

<style>
  #schools-input {
    width: 356px;
  }
</style>

<h1>Survey</h1>
<p>Please input a list of your colleges, separated by commas.</p>
<input
  id="schools-input"
  bind:value={schools}
  on:keypress={(e) => getSchoolRealNames()} />

{#if schoolsListFinal.length > 0 && schoolsListFinal[0] != ''}
  <ol>
    {#each schoolsListFinal as s}
      <li>{s}</li>
    {/each}
  </ol>
{/if}

<form id="survey" action="#xxx" on:submit|preventDefault={handleSubmit}>
  {#if schoolsListFinal.length > 0 && schoolsListFinal[0] != ''}
    {#each schoolsListFinal as s}
      <div>
        <span><strong>{s}</strong></span>
        <br />
        {#each ['accepted', 'denied', 'waitlisted'] as res}
          <label><input
              type="radio"
              name={s}
              value={res} /><span>{res}</span></label>
        {/each}
      </div>
      <br />
    {/each}
  {/if}

  <!-- <label><b>Date</b></label>
    <input type="date" name="date" /> -->

  <br />
  <button type="submit">Submit</button>
</form>
