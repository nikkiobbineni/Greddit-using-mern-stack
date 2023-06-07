  {users === "true" &&
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ border: '2px solid black', borderRadius: '15px', width: '50%', margin: 'auto', padding: '20px' }}>
              <h2 style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>Joined Users</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {masterarrj && masterarrj.map((item, index) => (
                  <li key={index} style={{ marginBottom: '20px', fontSize: '18px', lineHeight: '1.5' }}>{item}</li>
                ))}
              </ul>
              <h2 style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>Blocked Users</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {masterarrb && masterarrb.map((item, index) => (
                  <li key={index} style={{ fontColor: 'grey', marginBottom: '10px', fontSize: '18px', lineHeight: '1.5' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>}
        {pendinguser === "true" &&
          <div>
            <h2>Pending Users </h2>
            {masterarrp && masterarrp.map((name, index) => (
              <Card
                name={name}
                onAccept={(e) => { e.preventDefault(); add(name) }}
                onReject={(e) => { e.preventDefault(); reject(name) }}
              />
            ))}
          </div>
        }
        {reportedpage === "true" &&
          <table>
            <thead>
              <tr>
                <th>Reported By</th>
                <th>Whom we have reported</th>
                <th>Concern</th>
                <th>Text of the Post</th>
                <th>Block</th>
                <th>Delete</th>
                <th>Ignore</th>
              </tr>
            </thead>
            <tbody>
              {masterarrt.map((item, index) => (
                <tr key={index}>
                  <td>{masterarrrp[index]}</td>
                  <td>{masterarrro[index]}</td>
                  <td>{masterarrc[index]}</td>
                  <td>{item}</td>
                  {masterarrig[index] === true &&
                    <div>
                      <td><button onClick={() => blockhim(index)} disabled={true}>Block</button></td>
                      <td><button onClick={() => deletehim(masterarri[index])} disabled={true}>Delete</button></td>
                    </div>
                  }
                  {masterarrig[index] === false &&
                    <div>
                      <td><button onClick={() => blockhim(index)} >Block</button></td>
                      <td><button onClick={() => deletehim(masterarri[index])} >Delete</button></td>
                    </div>
                  }
                  <td><button onClick={() => ignorehim(index)}>Ignore</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }