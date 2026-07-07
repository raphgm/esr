with open("src/components/CommunitySection.tsx", "r") as f:
    lines = f.readlines()

# Find the last button
last_btn_idx = -1
for i, line in enumerate(lines):
    if "            ))}          </div>        </div>      </div>" in "".join(lines[i-1:i+2]) or "</div>" in line:
        pass

# Let's just find the last `            ))}          </div>        </div>` and then truncate and add the exact right ending.
