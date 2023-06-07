import "./App.css";

function App() {

  const mahasiswaCount = 10;
  const mahasiswa = new Array(mahasiswaCount)
    .fill("mahasiswa_")
    .map((item, index) => (item += index + 1));
  const mahasiswaKeys = mahasiswa.reduce((acc, value) => {
    return { ...acc, [value]: "" };
  }, {});
  const aspekCount = 4;
  const penilaian = new Array(aspekCount)
    .fill("aspek_penilaian_")
    .map((item, index) => (item += index + 1));
  const output = penilaian.reduce((acc, value) => {
    return { ...acc, [value]: mahasiswaKeys };
  }, {});

  const handleSelect = (penilaian, mahasiswa, e) => {
    e.preventDefault();
    output[penilaian][mahasiswa] = parseInt(e.target.value);
    console.log(output);
  };

  const handleSimpan = (e) => {
    e.preventDefault();

    const blob = new Blob([JSON.stringify(output)], { type: "text/json" });
    const a = document.createElement("a");
    a.download = "penilaian-mahasiswa.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              {penilaian.map((item, index) => {
                return <th key={index + 1}>Aspek Penilaian {index + 1}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((mahasiswa, index) => {
              return (
                <tr key={index + 1}>
                  <td>Mahasiswa {index + 1}</td>
                  {penilaian.map((penilaian, index) => {
                    return (
                      <td key={index + 1}>
                        <select
                          name={penilaian}
                          id={penilaian}
                          onChange={(e) =>
                            handleSelect(penilaian, mahasiswa, e)
                          }
                          defaultValue={"placeholder"}
                        >
                          <option value="placeholder" disabled>
                            Choose 1-10
                          </option>
                          {Array(10)
                            .fill(null)
                            .map((item, index) => {
                              return (
                                <option value={index + 1} key={index + 1}>
                                  {index + 1}
                                </option>
                              );
                            })}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              {Array(4)
                .fill(0)
                .map((item,index) => {
                  return <td key={item + index}></td>;
                })}
              <td>
                <button onClick={(e) => handleSimpan(e)}>Simpan</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default App;
