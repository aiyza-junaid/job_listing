$(document).ready(function() {

     $('.overlay').hide();
     $('.add_popup').hide();
    $.getJSON('data.json', function(data) {
      const body = $('body');
  
      $.each(data, function(index, job) {
        // Create main job list container
        const jobDiv = $('<div>').addClass('job_list');
        
       
        // Create the logo image and add it to the jobDiv
        const logoImage = $('<img>').attr('src', job.logo);
        jobDiv.append(logoImage);
  
        // Create the inner container
        const innerContainer = $('<div>').addClass('full_inner');
  
        // Create the description container
        const descriptionContainer = $('<div>').addClass('description');
  
        // Create the company details and buttons container
        const companyDetails = $('<div>').addClass('n_f_buttons');
        companyDetails.append('<h2>' + job.company + '</h2>');
  
        // Create 'New' button if job is new
        if (job.new) {
          const newButton = $('<button>').addClass('new').text('New');
          companyDetails.append(newButton);
        }
  
        // Create 'Featured' button if job is featured
        if (job.featured) {
          const featureButton = $('<button>').addClass('feature').text('Featured!');
          companyDetails.append(featureButton);
          
        }
  
        // Create the position heading
        const positionHeading = $('<h1>').text(job.position).addClass('JPosition');
  
       

        // Create the job details container
        const jobDetails = $('<div>').addClass('job-details');
        
         // Create a horizontal bullet list
      const bulletList = $('<ul>').addClass('horizontal-bullet-list');

      // Add items to the bullet list
      const items = [job.postedAt , job.contract, job.location];
      $.each(items, function(_, item) {
        const listItem = $('<li>').text(item);
        bulletList.append(listItem);
      });



      const langsDiv = $('<div>').addClass('langs');

      // Create buttons for level and role
      const levelButton = $('<button>').addClass('job_button').text(job.level);
      const roleButton = $('<button>').addClass('job_button').text(job.role);
      
      langsDiv.append(levelButton, roleButton);

      // Split languages by commas and create buttons for each language
      $.each(job.languages, function(_, language) {
        const button = $('<button>').addClass('job_button').text(language);
        langsDiv.append(button);
      });

       // Split tools by commas and create buttons for each tool
      $.each(job.tools, function(_, tool) {
        const toolButton = $('<button>').addClass('job_button').text(tool);
        langsDiv.append(toolButton);
      });

      const removeButton = $('<button>').addClass('remove_button').text('X');
      langsDiv.append(removeButton);

      // Append the bullet list to jobDetails
      jobDetails.append(bulletList);
      innerContainer.append(langsDiv);
  
        // Append companyDetails, positionHeading, and jobDetails to descriptionContainer
        descriptionContainer.append(companyDetails);
        descriptionContainer.append(positionHeading);
        descriptionContainer.append(jobDetails);
  
        // Append descriptionContainer and langsContainer to innerContainer
        innerContainer.append(descriptionContainer);
  
        // Append innerContainer to the jobDiv
        jobDiv.append(innerContainer);
  
        // Append jobDiv to the body
        body.append(jobDiv);

        

        

    });
    

  
    $('.job_button').on('click', function() {
      // Get the text from the button clicked
      var buttonText = $(this).text();
  
      // Check if this button is already in the filter
      if (!$('.filter_buttons:contains(' + buttonText + ')').length) {
          // Create a new filter button
          var newButton = $('<button>').addClass('filter_buttons').text(buttonText);
          var cross_filter = $('<button>').addClass('cross_filter').text('X');
          
          // Append the filter button and cross button to the filter section
          $('.filter').append(newButton);
          $('.filter').append(cross_filter);
  
          // Event listener for cross_filter click
          cross_filter.on('click', function() {
              // Remove the filter button and its corresponding cross button
              $(this).prev('.filter_buttons').remove();
              $(this).remove();
  
              // Update filtered job lists
              updateFilteredJobLists();
          });
      }
  
      // Update filtered job lists
      updateFilteredJobLists();
  });
  
  function updateFilteredJobLists() {
      // Show all job lists
      $('.job_list').show();
  
      // Iterate through each filter button
      $('.filter_buttons').each(function() {
          var filterText = $(this).text();
  
          // Hide job lists that don't contain the filter text
          $(".job_list").each(function() {
              if ($(this).find('.job_button:contains(' + filterText + ')').length === 0) {
                  $(this).hide();
              }
          });
      });
  }
  


  $(document).on('click', '.right-align', function(){


    var $parent = $(this).parent();

    $('.job_list').each(function(){

      
      $('.job_list').show();
  
      
    });

    $parent.empty().append($(this));

  });


  //removes a data list 

  $(document).on('click','.remove_button',  function(){

   
      $(this).closest('.job_list').remove();
   

  });


  //add button clicked

  $(document).on('click','.fixed_add',  function(){

    $('.overlay').toggle();
    $('.add_popup').toggle();

  });   

  $(document).on('click','.close_AddPopup',  function() {
    $('.overlay').hide();
    $('.add_popup').hide();
  });

  let currentjobList;

  // Add new job_list
  $('#myForm').submit(function(event) {
    
    $('.overlay').hide();
    $('.add_popup').hide();
    event.preventDefault(); // Prevent form submission
  
    // Get form data
    var companyname = $('#company_name').val();
    var neww = $('#new').val();
    var featuredd = $('#featured').val();
    var position = $('#position').val();
    var postedAt= $('#postedAt').val();
    var contract=$('#contract').val();
    var location=$('#location').val();
    var role=$('#role').val();
    var level=$('#level').val();
    var lan=$('#languages').val();
    var tools=$('#tools').val();
    const Arraylang = lan.split(',');
    const Arraytools = tools.split(',');


    const jobDiv = $('<div>').addClass('job_list');
    const innerContainer = $('<div>').addClass('full_inner');
    const descriptionContainer = $('<div>').addClass('description');
    const f=$('<div>').addClass('new').text('New');
    const n=$('<div>').addClass('feature').text('Featured!');
    const n_f_container = $('<div>').addClass('n_f_buttons');
    const positionH = $('<h1>').text(position).addClass('JPosition');
   
    var jobDetails = $('<div>').addClass('job-details');
    var bulletList = $('<ul>').addClass('horizontal-bullet-list');

    const langsDiv = $('<div>').addClass('langs');

    const levelButton = $('<button>').addClass('job_button').text(level);
    const roleButton = $('<button>').addClass('job_button').text(role);
      
    langsDiv.append(levelButton, roleButton);

    $.each(Arraylang, function(_, language) {
        const button = $('<button>').addClass('job_button').text(language);
        langsDiv.append(button);
    });

    $.each(Arraytools, function(_, tool) {
        const toolButton = $('<button>').addClass('job_button').text(tool);
        langsDiv.append(toolButton);
    });

    const removeButton = $('<button>').addClass('remove_button').text('X');
    langsDiv.append(removeButton);

    var items = [postedAt , contract, location];
    $.each(items, function(_, item) {
      const listItem = $('<li>').text(item);
      bulletList.append(listItem);
    });

  
    currentjobList = jobDiv;
  
    // Bind the change event
    $('#myFile').change(function() {
      console.log('File selected!');
      const file = this.files[0];
  
      if (file && currentjobList) {
        const reader = new FileReader();
  
        reader.onerror = function(event) {
          console.error("FileReader error:", event.target.error);
        };
  
        reader.onload = function(e) {
          console.log('Reader onload triggered!');
          console.log(e.target.result);
  
          // Display the image first
          var logo = $('<img>').attr('src', e.target.result);
          jobDiv.prepend(logo); // Prepend the image to descriptionContainer
        };
  
        reader.readAsDataURL(file);
      }
    });
  
    // Trigger the change event
    $('#myFile').trigger('change');

    
  
    n_f_container.append('<h2>' + companyname + '</h2>');


   
    if(neww == 'true' ){
      n_f_container.append(f);
    }
    if(featuredd == 'true'){
      n_f_container.append(n);
    }

    jobDetails.append(bulletList);
    descriptionContainer.append(n_f_container);
    descriptionContainer.append(positionH);
    descriptionContainer.append(jobDetails);
    innerContainer.append(descriptionContainer);
    innerContainer.append(langsDiv);
    jobDiv.append(innerContainer);
  
    // Append the job_list div to the page
    $('body').append(jobDiv);  // Use $('body') to append to the body
  });
  

  $(document).on('click','.job_list',  function(){
  
    if ($(event.target).hasClass('job_button')) {
      return;  
   }
   if ($(event.target).hasClass('remove_button')) {
    return;  
 }
    $('.overlay').toggle();
    $('.description_popup').toggle();

    var comapnayName = $(this).find('.n_f_buttons h2').text();
    var ComapanyImage = $(this).find('img').attr('src');

    const Content = $('<div>').addClass('Content');
    const des = $('<div>').addClass('Content').html(`<h2> ${comapnayName}, regardless of its industry, is an organization established to achieve specific objectives. Companies typically have a name and logo representing their brand. They often have a mission statement that succinctly outlines their purpose and ambitions. They offer products or services, each with its own unique features and benefits.</h2>`);
    const insertImage = $('<img>').attr('src', ComapanyImage);
    Content.append(insertImage, comapnayName, des);

    $('.description_popup').append(Content);


  });

  $(document).on('click','.close_DesPopup',  function() {
    var $parent = $(this).parent();
    $parent.empty();
    $('.description_popup').append($(this));
    $('.overlay').hide();
    $('.description_popup').hide();
   
  });
  




  });

});
  