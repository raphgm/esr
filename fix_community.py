with open("src/components/CommunitySection.tsx", "r") as f:
    lines = f.readlines()
    
# We want to end the file properly. Let's find the `))}          </div>        </div>` part
for i in range(len(lines)-1, -1, -1):
    if "))}          </div>        </div>" in "".join(lines[i-2:i+1]) or "</div>" in lines[i]:
        pass

# Actually let's just grab the last 20 lines to see what we're dealing with
