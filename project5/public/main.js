window.onload = () => {
    console.log("page has loaded");

    //click sound
    var flipSound = new Audio('/sound/paperflip.MP3');
    document.addEventListener('click', function() {
        flipSound.currentTime = 0;
        flipSound.play().catch(function() {});
    });

    //resume bgm
    var musicStart=sessionStorage.getItem('musicStart');
    if (musicStart){
        var bgMusic=new Audio('/sound/music.MP3');
        bgMusic.loop =true;
        bgMusic.volume=0.5;
        bgMusic.addEventListener('loadedmetadata',function() {
            bgMusic.currentTime = (Date.now()-parseInt(musicStart))/1000 % bgMusic.duration;
            bgMusic.play().catch(function() {
                function resumeMusic() {
                    bgMusic.play().catch(function() {});
                    document.removeEventListener('click',resumeMusic);
                    document.removeEventListener('keydown', resumeMusic);
                }
                document.addEventListener('click',resumeMusic);
                document.addEventListener('keydown',resumeMusic);
            });
        });
    }

    //Page 1
    var startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            sessionStorage.setItem('musicStart', Date.now().toString());
            var blackout = document.getElementById('blackout');
            blackout.style.opacity ='1';
            blackout.style.pointerEvents ='all';
            setTimeout(function(){
                window.location.href ='/page2';
            }, 2000);
        });

        document.addEventListener('mousemove', function(e) {
            const centerX=window.innerWidth /2;
            const centerY =window.innerHeight / 2;
            const mouseX =e.clientX - centerX;
            const mouseY =e.clientY - centerY;
            document.querySelectorAll('.layer').forEach(function(layer) {
                const depth =layer.dataset.depth;
                layer.style.transform =`translate(${mouseX * depth * 0.01}px, ${mouseY * depth * 0.01}px)`;
            });
        });
    }

    //location pages
    var sceneBg=document.querySelector('.scene-bg');
    if (sceneBg) {
        var blackout=document.getElementById('blackout');
        blackout.style.transition = 'none';
        blackout.style.opacity = '1';
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                blackout.style.transition = 'opacity 1.5s ease';
                blackout.style.opacity = '0';
            });
        });

        var returnBtn=document.getElementById('return-btn');
        if (returnBtn) {
            returnBtn.addEventListener('click', function() {
                blackout.style.transition='opacity 1.5s ease';
                blackout.style.opacity='1';
                blackout.style.pointerEvents='all';
                setTimeout(function() {
                    window.location.href='/page2?torch=true';
                },1500);
            });
        }

        var nofoundEl=document.getElementById('nofound-overlay');
        var greedyEl=document.getElementById('greedy-overlay');

        function showOverlay(el) {
            el.style.opacity = '1';
            el.style.pointerEvents ='all';
            setTimeout(function() {
                el.style.opacity ='0';
                el.style.pointerEvents = 'none';
            }, 2500);
        }

        var foundModal=document.getElementById('found-modal');

        var foundCongratsEl =foundModal.querySelector('.found-congrats');
        var foundNameEl =foundModal.querySelector('.found-name');
        var foundStoryEl= foundModal.querySelector('.found-story');
        var foundBtnsEl =foundModal.querySelector('.found-btns');

        foundModal.querySelector('#btn-close').addEventListener('click', function() {
            foundModal.style.opacity ='0';
            foundModal.style.pointerEvents='none';
        });
        foundModal.querySelector('#btn-diary').addEventListener('click', function() {
            blackout.style.transition = 'opacity 1.5s ease';
            blackout.style.opacity= '1';
            blackout.style.pointerEvents= 'all';
            setTimeout(function() { window.location.href = '/diary'; }, 1500);
        });

        function showFoundModal(name, story) {
            foundNameEl.textContent= name;
            foundStoryEl.textContent= story;
            foundModal.style.opacity= '1';
            foundModal.style.pointerEvents='all';
            setTimeout(function() {
                foundCongratsEl.style.opacity ='1';
                setTimeout(function() {
                    foundNameEl.style.opacity ='1';
                    setTimeout(function() {
                        foundStoryEl.style.opacity = '1';
                        setTimeout(function() {
                            foundBtnsEl.style.opacity = '1';
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 800);
        }

        var visitData = JSON.parse(sessionStorage.getItem('gardenVisit') || '{"missCount":0,"found":false}');

        document.querySelectorAll('.dig-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (visitData.found) {
                    showOverlay(greedyEl);
                    return;
                }
                var isFound = visitData.missCount >= 5 || Math.random() < 0.3;
                if (isFound) {
                    visitData.found = true;
                    sessionStorage.setItem('gardenVisit', JSON.stringify(visitData));
                    fetch('/api/dig-object')
                        .then(function(r) { return r.json(); })
                        .then(function(data) { showFoundModal(data.name, data.story); })
                        .catch(function() { showFoundModal('A Forgotten Thing', 'Its history is lost, like all things buried long enough.'); });
                } else {
                    visitData.missCount++;
                    sessionStorage.setItem('gardenVisit', JSON.stringify(visitData));
                    showOverlay(nofoundEl);
                }
            });
        });
    }

    //page 2
    var quote1El = document.getElementById('quote1');
    if (quote1El) {
        var blackout = document.getElementById('blackout');
        blackout.style.transition = 'none';
        blackout.style.opacity = '1';
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                blackout.style.transition = 'opacity 3s ease';
                blackout.style.opacity = '0';
            });
        });
        var quote2El= document.getElementById('quote2');
        var quote3El= document.getElementById('quote3');
        var quote4El= document.getElementById('quote4');

        //quote texts
        var quotes = [
            { zh: '歡迎你，旅人。\n我已在此等你许久了。',         en: 'Welcome, Visitor.\nThe Garden has been waiting for you.' },
            { zh: '這些所丢失的事物。\n你將成為這些遺流之物最後的見證人。', en: 'Things we forgot to carry with us — still buried here.\nYou are their last witness.' },
            { zh: '去吧，執燈而行。',                              en: 'Take your Lantern. Walk through.' },
            { zh: '切記勿貪。每次只可取其一。',              en: 'Don\'t be greedy. You may only take one.' }
        ];

        var q1FadeIn= 1500, q1Hold = 2000, q1FadeOut = 1500;
        var q2FadeIn= 1500, q2Hold = 3000, q2FadeOut = 1500;
        var q3FadeIn= 1500, q3Hold = 2500;
        var q4FadeIn= 2500;
        var lanternFadeIn= 2000;

        var lanternBtn = document.getElementById('lantern-btn');
        var flameEl = document.getElementById('flame');
        var flareEl = document.getElementById('flare');
        var darkCover = document.querySelector('.dark-cover');

        //torch mode
        var mx = window.innerWidth /2, my = window.innerHeight /2;
        var fx, fy, vx =0, vy = 0;
        var torchActive =false;
        var flickerTarget =0,flickerVal =0,flickerTimer = 0;

        document.addEventListener('mousemove', function(e) {
            mx = e.clientX;
            my = e.clientY;
            if (fx ===undefined){fx=mx;fy=my;}
        });

        function torchLoop() {
            if (!torchActive) return;
            vx=(vx + (mx-fx)*0.12)*0.78;
            vy=(vy+(my-fy)*0.12)*0.78;
            fx+= vx;
            fy+= vy;
            flickerTimer++;
            if (flickerTimer > 8) { flickerTarget = (Math.random() - 0.5) * 22; flickerTimer = 0; }
            flickerVal += (flickerTarget - flickerVal) * 0.25;
            darkCover.style.setProperty('--mx',fx-40 +'px');
            darkCover.style.setProperty('--my',fy +'px');
            darkCover.style.setProperty('--r1',(60 + flickerVal)+'px');
            darkCover.style.setProperty('--r2', (140+flickerVal) + 'px');
            flameEl.style.left=mx+'px';
            flameEl.style.top=my+'px';
            flameEl.style.transform ='translate(-140%,-10%)';
            requestAnimationFrame(torchLoop);
        }

        lanternBtn.addEventListener('click', function() {
            var content = document.querySelector('.page2-content');
            content.style.transition = 'opacity 1.5s ease';
            content.style.opacity = '0';
            setTimeout(function() {
                content.style.pointerEvents = 'none';
                document.body.style.cursor = 'none';
                fx = mx; fy = my; vx = 0; vy = 0;
                flareEl.style.left = mx + 'px';
                flareEl.style.top = my + 'px';
                flareEl.classList.add('igniting');
                darkCover.style.setProperty('--mx', mx + 'px');
                darkCover.style.setProperty('--my', my + 'px');
                darkCover.classList.add('torch-active');
                flameEl.style.left = mx + 'px';
                flameEl.style.top = my + 'px';
                flameEl.style.transform = 'translate(-50%, -50%)';
                flameEl.style.transition = 'opacity 0.3s ease';
                flickerTimer = 0; flickerVal = 0; flickerTarget = 0;
                flameEl.style.opacity = '1';
                torchActive = true;
                torchLoop();
            }, 1500);
        });

        function setQuote(el, q) {
            el.querySelector('.q-zh').textContent = q.zh;
            el.querySelector('.q-en').textContent = q.en;
        }

        function showQuote1() {
            setQuote(quote1El, quotes[0]);
            quote1El.style.transition = 'opacity ' + q1FadeIn/1000 + 's ease';
            quote1El.style.opacity = '1';
            setTimeout(function() {
                quote1El.style.transition = 'opacity ' + q1FadeOut/1000 + 's ease';
                quote1El.style.opacity = '0';
                setTimeout(showQuote2, q1FadeOut);
            }, q1FadeIn + q1Hold);
        }

        function showQuote2() {
            setQuote(quote2El, quotes[1]);
            quote2El.style.transition = 'opacity ' + q2FadeIn/1000 + 's ease';
            quote2El.style.opacity = '1';
            setTimeout(function() {
                quote2El.style.transition = 'opacity ' + q2FadeOut/1000 + 's ease';
                quote2El.style.opacity = '0';
                setTimeout(showQuote3, q2FadeOut);
            }, q2FadeIn + q2Hold);
        }

        function showQuote3() {
            setQuote(quote3El, quotes[2]);
            quote3El.style.transition = 'opacity ' + q3FadeIn/1000 + 's ease';
            quote3El.style.opacity = '1';
            setTimeout(function() {
                setQuote(quote4El, quotes[3]);
                quote4El.style.transition = 'opacity ' + q4FadeIn/1000 + 's ease';
                quote4El.style.opacity = '1';
                setTimeout(function() {
                    lanternBtn.style.transition = 'opacity ' + lanternFadeIn/1000 + 's ease';
                    lanternBtn.style.opacity = '1';
                }, q4FadeIn);
            }, q3FadeIn + q3Hold);
        }

        //location button
        var locBtns = [
            { id: 'loc-gate',     href: '/gate-of-parting' },
            { id: 'loc-pavilion', href: '/pavilion-of-forgetting' },
            { id: 'loc-pond',     href: '/pond-of-mirror' },
            { id: 'loc-diary',    href: '/diary' }
        ];
        locBtns.forEach(function(item) {
            var el = document.getElementById(item.id);
            if (el) {
                el.addEventListener('click', function() {
                    blackout.style.transition = 'opacity 1.5s ease';
                    blackout.style.opacity = '1';
                    blackout.style.pointerEvents = 'all';
                    setTimeout(function() {
                        window.location.href = item.href;
                    }, 1500);
                });
            }
        });

        //check torch mode
        var torchParam = new URLSearchParams(window.location.search).get('torch');
        if (torchParam === 'true') {
            var content = document.querySelector('.page2-content');
            content.style.opacity = '0';
            content.style.pointerEvents ='none';
            document.body.style.cursor ='none';
            fx = mx; fy = my; vx = 0; vy = 0;
            darkCover.style.setProperty('--mx', mx + 'px');
            darkCover.style.setProperty('--my', my + 'px');
            darkCover.classList.add('torch-active');
            flameEl.style.left = mx +'px';
            flameEl.style.top = my +'px';
            flameEl.style.transform ='translate(-50%, -50%)';
            flameEl.style.opacity ='1';
            torchActive=true;
            torchLoop();
        } else {
            setTimeout(showQuote1,3200);
        }
    }

    //diary page
    var diaryBg = document.getElementById('diary-bg');
    if (diaryBg) {
        var blackout = document.getElementById('blackout');
        blackout.style.transition = 'none';
        blackout.style.opacity = '1';
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                blackout.style.transition = 'opacity 1.5s ease';
                blackout.style.opacity = '0';
            });
        });
        var diaryContentEls = [
            document.getElementById('book-container'),
            document.querySelector('#diary-bg .scene-title'),
            document.getElementById('return-btn'),
            document.getElementById('write-btn')
        ];

        var diaryQuote = document.getElementById('diary-quote');
        setTimeout(function() {
            diaryQuote.style.opacity = '1';
            setTimeout(function() {
                diaryQuote.style.opacity = '0';
                setTimeout(function() {
                    diaryContentEls.forEach(function(el) { if (el) el.style.opacity = '1'; });
                }, 1500);
            }, 1500 + 2500);
        }, 1500);

        var returnBtn = document.getElementById('return-btn');
        if (returnBtn) {
            returnBtn.addEventListener('click', function() {
                blackout.style.transition = 'opacity 1.5s ease';
                blackout.style.opacity = '1';
                blackout.style.pointerEvents = 'all';
                setTimeout(function() { window.location.href = '/page2?torch=true'; }, 1500);
            });
        }

        var currentPage  = 0;
        var allEntries   = [];
        var pageStarts   = [];
        var totalSpreads = 0;
        var entryTpl   = document.getElementById('entry-tpl');
        var leftPage   = document.getElementById('book-left-page');
        var rightPage  = document.getElementById('book-right-page');
        var leftArrow  = document.getElementById('book-left-arrow');
        var rightArrow = document.getElementById('book-right-arrow');

        function makeEntry(e) {
            var node = entryTpl.content.cloneNode(true);
            node.querySelector('.entry-finding').textContent = e.finding;
            node.querySelector('.entry-by').textContent = 'By ' + e.nickname + ', ' + e.date;
            return node;
        }

        function buildPageBreaks() {
            pageStarts = [];
            if (allEntries.length === 0) { totalSpreads = 0; return; }

            var probe = document.createElement('div');
            var cs = getComputedStyle(leftPage);
            probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;top:-9999px;left:-9999px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-start;box-sizing:border-box;';
            probe.style.width   = leftPage.clientWidth  + 'px';
            probe.style.height  = leftPage.clientHeight + 'px';
            probe.style.padding = cs.padding;
            document.body.appendChild(probe);

            var i = 0;
            while (i < allEntries.length) {
                pageStarts.push(i);
                probe.innerHTML = '';
                var added = 0;
                while (i < allEntries.length) {
                    probe.appendChild(makeEntry(allEntries[i]));
                    if (probe.scrollHeight > probe.clientHeight && added > 0) {
                        probe.removeChild(probe.lastElementChild);
                        break;
                    }
                    added++;
                    i++;
                }
                if (added === 0) break;
            }

            document.body.removeChild(probe);
            totalSpreads = Math.ceil(pageStarts.length / 2);
        }

        function renderBook() {
            buildPageBreaks();
            if (currentPage >= totalSpreads && totalSpreads > 0) currentPage = totalSpreads - 1;

            var leftStart= pageStarts[currentPage * 2]     !== undefined ? pageStarts[currentPage * 2]:0;
            var rightStart= pageStarts[currentPage * 2 + 1] !== undefined ? pageStarts[currentPage * 2+1]:allEntries.length;
            var rightEnd = pageStarts[currentPage * 2 + 2] !== undefined ? pageStarts[currentPage * 2 +2] :allEntries.length;

            leftPage.innerHTML= '';
            rightPage.innerHTML= '';
            for (var i= leftStart;i < rightStart; i++) { leftPage.appendChild(makeEntry(allEntries[i])); }
            for (var i= rightStart;i< rightEnd;i++) {rightPage.appendChild(makeEntry(allEntries[i])); }

            leftArrow.style.opacity  = currentPage > 0 ?'0.8':'0.2';
            rightArrow.style.opacity = currentPage < totalSpreads - 1?'0.8':'0.2';
        }

        function loadEntries() {
            fetch('/api/diary-entries')
                .then(function(r) {return r.json(); })
                .then(function(data) { allEntries = data; renderBook(); });
        }

        leftArrow.addEventListener('click', function() {
            if (currentPage > 0) { currentPage--; renderBook(); }
        });
        rightArrow.addEventListener('click', function() {
            if (currentPage < totalSpreads - 1) { currentPage++; renderBook(); }
        });

        //note modal
        var noteModal= document.getElementById('note-modal');
        var writeBtn= document.getElementById('write-btn');
        var btnLeave= document.getElementById('btn-leave');
        var btnRecord= document.getElementById('btn-record');
        var noteFinding= document.getElementById('note-finding');
        var noteNickname= document.getElementById('note-nickname');

        writeBtn.addEventListener('click', function() {
            noteModal.style.opacity ='1';
            noteModal.style.pointerEvents = 'all';
        });
        btnLeave.addEventListener('click', function() {
            noteModal.style.opacity ='0';
            noteModal.style.pointerEvents = 'none';
        });
        btnRecord.addEventListener('click', function() {
            var finding =noteFinding.value.trim();
            var nickname=noteNickname.value.trim();
            if (!finding ||!nickname) return;
            fetch('/api/diary-entry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ finding: finding, nickname: nickname })
            }).then(function() {
                noteFinding.value  = '';
                noteNickname.value = '';
                noteModal.style.opacity = '0';
                noteModal.style.pointerEvents = 'none';
                currentPage = Infinity;
                loadEntries();
            });
        });

        document.getElementById('btn-record').addEventListener('click',function(e) {
            var ink = document.createElement('div');
            ink.className ='ink-drop';
            ink.style.left =e.clientX + 'px';
            ink.style.top=e.clientY + 'px';
            document.body.appendChild(ink);
            setTimeout(function() { ink.remove(); }, 750);
        });

        loadEntries();
    }
}
