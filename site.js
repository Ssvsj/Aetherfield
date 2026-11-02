
(function(){
  var page=(location.pathname.split('/').pop()||'index.html');

  var cur=function(h){
    return (page===h||(h==='careers.html'&&page==='role.html')||(h==='journal.html'&&page==='article.html'))?' aria-current="page"':'';
  };

  var head=document.getElementById('site-head');
  if(head) head.innerHTML='<div class="wrap"><a class="logo" href="index.html">Aetherfield</a><nav aria-label="Main"><a href="index.html">Product</a><a href="journal.html"'+cur('journal.html')+'>Journal</a><a href="about.html"'+cur('about.html')+'>About</a><a href="careers.html"'+cur('careers.html')+'>Careers</a><a href="index.html#start">Get started &rarr;</a></nav></div>';

  var foot=document.getElementById('site-foot');
  if(foot) foot.innerHTML='<div class="links"><div><a href="index.html">Product</a><a href="journal.html">Journal</a><a href="about.html">About</a><a href="careers.html">Careers</a><a href="index.html#start">Get started</a></div><span>&copy; 2025 &middot; All rights reserved</span></div>'+
  '<div class="tex" aria-hidden="true"><svg preserveAspectRatio="none" viewBox="0 0 1000 200"><defs><filter id="ft" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .03" numOctaves="3" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .42 0 0 0 0 .4 0 0 0 0 .06 0 0 0 9 -4.2"/></filter><pattern id="fd" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="2" cy="2" r="1.1" fill="#6a6710"/></pattern></defs><rect width="1000" height="200" fill="#fff23d"/><rect width="1000" height="200" filter="url(#ft)" opacity=".9"/><rect width="1000" height="200" fill="url(#fd)" opacity=".25"/></svg></div><div class="word" aria-hidden="true">Aetherfield</div>';

  document.querySelectorAll('[data-portrait]').forEach(function(el,i){
    var id='pd'+i;
    el.innerHTML='<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMax '+(el.getAttribute('data-fit')||'slice')+'" role="img" aria-label="'+(el.getAttribute('data-alt')||'Portrait')+'"><defs><pattern id="'+id+'" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="3.4" height="3.4" fill="#2a7de1"/><circle cx="1.7" cy="1.7" r=".7" fill="#7db4f4"/></pattern></defs><rect width="300" height="380" fill="#fff"/><g stroke="#fff" stroke-width="14" stroke-linejoin="round" fill="url(#'+id+')"><path d="M-10 380 C-5 300 60 270 110 255 L190 255 C240 270 305 300 310 380Z"/><ellipse cx="150" cy="140" rx="62" ry="78"/><rect x="128" y="200" width="44" height="64"/></g><g fill="url(#'+id+')"><path d="M-10 380 C-5 300 60 270 110 255 L190 255 C240 270 305 300 310 380Z"/><ellipse cx="150" cy="140" rx="62" ry="78"/><rect x="128" y="200" width="44" height="64"/></g></svg>';
  });

  // Load articles from the backend on the Journal page
  if(page === 'journal.html'){
    var grid = document.querySelector('.grid2');

    if(grid){
      fetch('http://localhost:3000/api/articles')
        .then(function(response){
          if(!response.ok) throw new Error('Could not load articles');
          return response.json();
        })
        .then(function(articles){
          grid.innerHTML = '';

          if(!articles.length){
            grid.innerHTML = '<p>No articles available yet.</p>';
            return;
          }

          articles.forEach(function(article){
            var card = document.createElement('article');
            card.className = 'post';

            var link = document.createElement('a');
            link.href = 'article.html?slug=' + encodeURIComponent(article.slug);

            var image = document.createElement('div');
            image.className = 'ph ph-cloth';

            var title = document.createElement('h3');
            title.textContent = article.title;

            var meta = document.createElement('p');
            meta.className = 'mono';
            meta.textContent = (article.tag || 'Journal') + ' · ' + (article.mins || 5) + ' min';

            var excerpt = document.createElement('p');
            excerpt.textContent = article.excerpt || '';

            link.appendChild(image);
            link.appendChild(title);
            link.appendChild(meta);
            link.appendChild(excerpt);
            card.appendChild(link);
            grid.appendChild(card);
          });
        })
        .catch(function(error){
          console.error('Articles loading error:', error);
          grid.innerHTML = '<p>Unable to load articles. Please check that the backend is running.</p>';
        });
    }
  }

})();
